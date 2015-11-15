/// <reference path="../../../typings/q/Q.d.ts" />

import sharejs from 'share';
import {BCSocket} from './node_modules/browserchannel/dist/bcsocket';
import json from 'ot-json0';
import jsondiff from 'jsondiff-share-ops';
import {Promise} from 'q';

declare class Document<T> {
    publish: (state: T) => any;
}

let createDocument = async function<T>(name: string, initialState: T, onChange: (x: T) => any) {
    let socket = new BCSocket(null, {reconnect: true});
    let sjs = new sharejs.Connection(socket);
    let doc = sjs.get('card-move-thing', name);
    let ctx = null;

    return new Promise<Document>((resolve, reject) => {
        doc.subscribe(() => onChange(ctx.getSnapshot()));

        doc.whenReady(() => {
            if (!doc.type) {
                doc.create(json.type.name, initialState);
            }

            ctx = doc.createContext();
            ctx.addListener({}, '', () => {}); //workaround for json0 api bug
            doc.on('after op', () => onChange(ctx.getSnapshot()));

            resolve({
                publish: (state: T) => {
                    if (!ctx) {
                        throw new Error('ShareJS context not ready yet');
                    }

                    let diff = jsondiff.diff(ctx.getSnapshot(), state);
                    if (diff.length > 0) {
                        ctx.submitOp(diff);
                    }
                }
            });
        });
    });
};

export createDocument;
