import { Plugin } from "obsidian";

export default class HideMouseCursorPlugin extends Plugin {
    onload() {
        console.log("HideCursorPlugin loaded.");

        const editorContainer = document.body;

        const handleMouseMove = () => {
            editorContainer.style.cursor = "auto";
        };

        const handleKeydown = () => {
            editorContainer.style.cursor = "none";
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeydown);

        this.register(() => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("keydown", handleKeydown);
        });
    }

    onunload() {
        console.log("HideCursorPlugin unloaded.");
    }
}
