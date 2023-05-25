import { nodes as basicNodes, marks } from 'ngx-editor';
import { DOMOutputSpec, Node as ProsemirrorNode, NodeSpec, Schema } from 'prosemirror-model';

const iframe: NodeSpec = {
    attrs: {
        src: { default: null },
        style: { default: null }
    },
    group: 'block',
    selectable: false,
    parseDOM: [{
        tag: 'iframe',
        getAttrs: (dom: HTMLElement) => ({
            src: dom.getAttribute('src'),
            style: dom.getAttribute('style')
        })
    }],
    toDOM(node: ProsemirrorNode): DOMOutputSpec {
        const attrs = {
            src: node.attrs['src'],
            style: node.attrs['style'],
            frameborder: '0',
            allowfullscreen: 'true'
        };
        return ['iframe', attrs];
    },
};

const div: NodeSpec = {
    attrs: {
        src: { default: null },
        style: { default: null }
    },
    content:'block*',
    selectable: false,
    parseDOM: [{
        tag: 'div',
        getAttrs: (dom: HTMLElement) => ({
            style: dom.getAttribute('style')
        })
    }],
    toDOM(node: ProsemirrorNode): DOMOutputSpec {
        const attrs = {
            style: node.attrs['style'],
        };
        return ['div', attrs];
    },

};
const nodes = Object.assign({}, basicNodes, {
    iframe,
    div,
});

const schema = new Schema({
    nodes,
    marks,
});

export default schema;