/// <reference path='../../typings/react/react.d.ts' />
declare module "react-markdown" {
    import React = __React;
    type RMProps = {
        className?: string,
        source: string,
        containerTagName?: string,
        sourcePos?: boolean,
        escapeHtml?: boolean,
        skipHtml?: boolean,
        softBreak?: boolean,
        highlight?: Function
    };
    let ReactMarkdown: React.ClassicComponentClass<RMProps>;
    export = ReactMarkdown;
}
