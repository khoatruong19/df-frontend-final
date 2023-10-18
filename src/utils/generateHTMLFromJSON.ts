import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function generateHTMLFromJSON(value: string) {
  let parseData = {};

  try {
    parseData = JSON.parse(value);
    return generateHTML(parseData, [
      StarterKit,
      BulletList,
      ListItem,
      OrderedList,
      Blockquote,
      Code,
      Underline,
      Image,
      Bold,
    ]);
  } catch (error) {
    return '';
  }
}
