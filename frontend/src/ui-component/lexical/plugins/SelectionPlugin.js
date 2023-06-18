import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState } from 'react';
import { SELECTION_CHANGE_COMMAND, $getSelection, $isRangeSelection, $isNodeSelection, $createParagraphNode, $getNodeByKey } from 'lexical';
import { $isAtNodeEnd } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';

const LowPriority = 1;

function getSelectedNode(selection) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
        return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
}

export default function SelectionPlugin() {
    const [editor] = useLexicalComposerContext();
    const [prevNodeKey, setPrevNodeKey] = useState(-1);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        const node = getSelectedNode(selection);
        console.log('SelectionPlugin node:', node);
        const text = node.__text;
        // console.log('SelectionPlugin:', text);

        // console.log('prevNode:', prevNodeKey);
        const currentKey = node.__key;
        // console.log('currentKey:', currentKey);
        if (prevNodeKey != -1 && prevNodeKey != currentKey) {
            const selectedNode = $getNodeByKey(prevNodeKey);
            if (selectedNode != null) {
                selectedNode.setStyle('background-color: #fff');
            }
        }

        // check node undefined and null
        if (text == undefined || text == null) {
            return;
        }

        // node.setStyle('color', 'red');
        // node.__style = 'red';
        node.setStyle('background-color: #22f3bc');
        setPrevNodeKey(currentKey);
    }, [editor, prevNodeKey]);

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    updateToolbar();
                    return false;
                },
                LowPriority
            )
        );
    }, [editor, updateToolbar]);

    return null;
}
