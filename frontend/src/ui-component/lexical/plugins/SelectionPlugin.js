import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import {
    SELECTION_CHANGE_COMMAND,
    $getSelection,
    $getRoot,
    $createTextNode,
    $isRangeSelection,
    $isNodeSelection,
    $createParagraphNode,
    $getNodeByKey
} from 'lexical';
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
    const [innerEditorState, setInnerEditorState] = useState(null);

    const highlightSelection = useCallback(() => {
        const nativeSelection = window.getSelection().toString();

        // if (nativeSelection.length > 0) {
        //     // console.log('SelectionPlugin nativeSelection:', nativeSelection.toString());
        //     return;
        // }

        const selection = $getSelection();
        console.log(selection);

        const node = getSelectedNode(selection);
        // console.log('SelectionPlugin node:', node);
        const text = node.__text;

        const currentKey = node.__key;
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

        node.setStyle('background-color: #22f3bc');
        setSelectedNodeKey(currentKey);
        setSelectedNodeText(text);

        // node.setTextContent('sssssssssssss');
    }, [editor, selectedNodeKey]);

    useEffect(() => {
        setInnerEditorState(editor.getEditorState());

        return mergeRegister(
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    highlightSelection();
                    return false;
                },
                LowPriority
            ),
            editor.registerUpdateListener(({ editorState }) => {
                // The latest EditorState can be found as `editorState`.
                // To read the contents of the EditorState, use the following API:

                setInnerEditorState(editorState);

                editorState.read(() => {
                    // Just like editor.update(), .read() expects a closure where you can use
                    // the $ prefixed helper functions.
                });
            })
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
                },
                setEditorState(editorStateJSONString) {
                    console.log('SelectionPlugin setEditorState:', editorStateJSONString);
                    const editorState = editor.parseEditorState(editorStateJSONString);
                    editor.setEditorState(editorState);
                },
                getEditorState() {
                    return innerEditorState;
                },
                createTextNode(text) {
                    editor.update(() => {
                        // Get the RootNode from the EditorState
                        const root = $getRoot();

                        // Create a new ParagraphNode
                        const paragraphNode = $createParagraphNode();

                        // Create a new TextNode
                        const textNode = $createTextNode(text);

                        // Append the text node to the paragraph
                        paragraphNode.append(textNode);

                        // Finally, append the paragraph to the root
                        root.append(paragraphNode);
                    });
                }
            };
        },
        [editor, selectedNodeKey, innerEditorState]
    );

    return null;
});
