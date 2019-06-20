export interface MessageLineText {
    type: 'text';
    text: string;
}

export interface MessageLinePrompt {
    type: 'prompt';
    actions: MessageAction[];
    resolve: (value: any) => void;
}
export interface MessageAction {
    text: string;
    value: any;
}

export interface MessageLineBreak {
    type: 'break';
}

export type MessageLine = MessageLineText | MessageLinePrompt | MessageLineBreak;

export class MessageBox {
    messageLines: MessageLine[] = [];

    constructor() {
    }

    show(messageLine: MessageLine) {
        this.messageLines.push(messageLine);
        // delay to let the page render
        setTimeout(this.scrollToBottom, 1);
    }

    showText(text: string) {
        this.show({type: 'text', text});
    }

    async prompt(actions: MessageAction[]) {
        return new Promise((resolve: (value: any) => void) => {
            this.show({type: 'prompt', actions, resolve});
        });
    }

    scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
}