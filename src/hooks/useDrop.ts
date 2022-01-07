import { Ref, ref, onUnmounted } from 'vue';

export default function useDrop(): { files: Ref<File[]> } {
  const files = ref([]) as Ref<File[]>;

  const handlePaste = (e: any) => {
    const { clipboardData } = e as ClipboardEvent;
    if (clipboardData && clipboardData.files.length > 0) {
      files.value = [...clipboardData.files];
    }
  };

  window.addEventListener('paste', handlePaste);

  onUnmounted(() => {
    window.removeEventListener('paste', handlePaste);
  });

  return {
    files,
  };
}
