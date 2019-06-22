import { delay } from './util';

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
    readonly MESSAGE_DELAY = 1500;
    messageLines: MessageLine[] = [];
    incomingMessages: MessageLine[] = [];
    processing = false;

    constructor() {
    }

    async processMessages() {
        this.processing = true;
        while (this.incomingMessages.length >= 1) {
            this.messageLines.push(this.incomingMessages.shift());
            // delay to let the page render
            setTimeout(this.scrollToBottom, 1);
            await delay(this.MESSAGE_DELAY);
        }
        this.processing = false;
    }

    show(messageLine: MessageLine) {
        this.incomingMessages.push(messageLine);
        if (!this.processing) {
            this.processMessages().catch();
        }
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