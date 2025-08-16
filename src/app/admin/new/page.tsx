'use client';

import { useRouter } from 'next/navigation';
import PostEditor from '@/components/PostEditor';
import { BlogPost } from '@/types/blog';

export default function NewPostPage() {
  const router = useRouter();

  const handleSave = async (postData: Partial<BlogPost>) => {
    try {
      // 这里应该调用 API 保存文章
      // 暂时模拟保存成功
      console.log('Saving post:', postData);
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('文章保存成功！');
      router.push('/admin');
    } catch (error) {
      console.error('Failed to save post:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    if (confirm('确定要取消吗？未保存的内容将丢失。')) {
      router.push('/admin');
    }
  };

  return (
    <PostEditor
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
