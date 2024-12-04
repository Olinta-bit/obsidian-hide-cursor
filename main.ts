import { Plugin } from "obsidian";

export default class HideMouseCursorPlugin extends Plugin {
    onload() {
        console.log("HideMouseCursorPlugin loaded.");

        const editorContainer = document.body;

        const handleMouseMove = () => {
            editorContainer.style.cursor = "auto";
        };

        const handleKeydown = (event: KeyboardEvent) => {
            const excludedKeys = ["Control", "Backspace", "Alt", "Meta", "Shift", "CapsLock", "Tab", "Escape"];
            // 排除特殊键和组合键
            if (!excludedKeys.includes(event.key) && !event.ctrlKey && !event.altKey && !event.metaKey) {
                editorContainer.style.cursor = "none";
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeydown);

        this.register(() => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("keydown", handleKeydown);
        });
    }

    onunload() {
        console.log("HideMouseCursorPlugin unloaded.");
    }
}
