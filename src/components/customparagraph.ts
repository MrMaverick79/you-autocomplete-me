import { mergeAttributes, Node } from '@tiptap/core'

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

export const CustomParagraph = Node.create<ParagraphOptions>({
  name: 'customparagraph',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {
        class: "custom"
      },
    }
  },

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      { tag: 'p' },
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

