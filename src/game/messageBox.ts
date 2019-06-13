export interface MessageLineText {
    type: 'text';
    text: string;
}

export interface MessageLinePrompt {
    type: 'prompt';
    actions: MessageAction[];
    resolve: () => void;
}
export interface MessageAction {
    text: string;
    callback(): void;
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
    }

    showText(text: string) {
        this.messageLines.push({type: 'text', text});
    }

    async prompt(actions: MessageAction[]) {
        return new Promise((resolve: () => void) => {
        this.messageLines.push({type: 'prompt', actions, resolve});
        });
    }
}