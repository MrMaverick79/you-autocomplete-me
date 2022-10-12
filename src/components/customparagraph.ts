import { mergeAttributes, Node } from '@tiptap/core'

//This component takes the original paragrapgh from the tiptap library and modifies it slightly, creating a new node so that wer can differentiate between human written lines and computer written lines.

export interface ParagraphOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraph: {
      /**
       * Toggle a paragraph
       */
      setParagraph: () => ReturnType,
    }
  }
}


//modifying the deafult paragrpah node to allow extra options
export const CustomParagraph = Node.create<ParagraphOptions>({
  name: 'customparagraph',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {
        class: "computer lines"
      },
      autocomplete: 'on',
    }
  },

  group: 'block',
  
  content: 'inline*',

  parseHTML() {
    return [
      { tag: 'p' },
      { tag: 'em' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.setNode(this.name)
      },
    }
  },


})

