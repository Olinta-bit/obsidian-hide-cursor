import { Plugin } from "obsidian";

export default class HideMouseCursorPlugin extends Plugin {
    onload() {
        console.log("HideMouseCursorPlugin loaded.");

        // 缓存 DOM 元素
        const editorContainer = document.body;
        const status: HTMLElement | null = document.querySelector(".status-bar");

        // 鼠标状态
        let isCursorVisible = true;
        let debounceTimeout: string | number | NodeJS.Timeout | undefined;

        // 核心逻辑封装
        const updateCursorState = (visible: boolean) => {
            if (visible !== isCursorVisible) {
                isCursorVisible = visible;
                editorContainer.style.cursor = visible ? "auto" : "none";
                // if (status) {
                //     status.style.opacity = visible ? "1" : "0.3";
                // }
            }
        };

        // 鼠标移动事件（节流）
        const handleMouseMove = () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                updateCursorState(true);
            }, 50); // 节流延迟 50ms
        };

        // 键盘事件处理
        const handleKeydown = (event: KeyboardEvent) => {
            const excludedKeys = [
                "Control",
                "Backspace",
                "Alt",
                "Meta",
                "Shift",
                "CapsLock",
                "Tab",
                "Escape",
            ];
            if (
                !excludedKeys.includes(event.key) &&
                !event.ctrlKey &&
                !event.altKey &&
                !event.metaKey
            ) {
                updateCursorState(false);
            }
        };

        // 注册事件
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeydown);

        // 清理事件
        this.register(() => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("keydown", handleKeydown);
        });
    }

    onunload() {
        console.log("HideMouseCursorPlugin unloaded.");
    }
}
