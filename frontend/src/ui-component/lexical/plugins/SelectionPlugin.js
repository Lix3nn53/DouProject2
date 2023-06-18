import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
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

export default forwardRef((props, ref) => {
    const [editor] = useLexicalComposerContext();
    const [selectedNodeKey, setSelectedNodeKey] = useState(-1);
    const [selectedNodeText, setSelectedNodeText] = useState(null);

    const highlightSelection = useCallback(() => {
        const nativeSelection = window.getSelection().toString();

        if (nativeSelection.length > 0) {
            console.log('SelectionPlugin nativeSelection:', nativeSelection.toString());
            return;
        }

        const selection = $getSelection();
        console.log(selection);

        const node = getSelectedNode(selection);
        console.log('SelectionPlugin node:', node);
        const text = node.__text;
        // console.log('SelectionPlugin:', text);

        // console.log('prevNode:', selectedNodeKey);
        const currentKey = node.__key;
        // console.log('currentKey:', currentKey);
        if (selectedNodeKey != -1 && selectedNodeKey != currentKey) {
            const selectedNode = $getNodeByKey(selectedNodeKey);
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
        setSelectedNodeKey(currentKey);
        setSelectedNodeText(text);

        // node.setTextContent('sssssssssssss');
    }, [editor, selectedNodeKey]);

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    highlightSelection();
                    return false;
                },
                LowPriority
            )
        );
    }, [editor, highlightSelection]);

    useImperativeHandle(
        ref,
        () => {
            return {
                getSelectedNodeText() {
                    if (selectedNodeKey != -1) {
                        if (selectedNodeKey != -1) {
                            return selectedNodeText;
                        }
                    }

                    return null;
                },
                setSelectedNodeText(text) {
                    editor.update(() => {
                        if (selectedNodeKey != -1) {
                            const selectedNode = $getNodeByKey(selectedNodeKey);
                            if (selectedNode != null) {
                                selectedNode.setTextContent(text);
                            }
                        }
                    });
                }
            };
        },
        [editor, selectedNodeKey]
    );

    return null;
});
