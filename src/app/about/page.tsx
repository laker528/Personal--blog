import { Metadata } from 'next';
import Image from 'next/image';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { blogConfig } from '@/config/blog';

export const metadata: Metadata = {
  title: '关于我',
  description: `了解更多关于 ${blogConfig.author.name} 的信息`,
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-12 text-white">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
              {blogConfig.author.avatar ? (
                <Image
                  src={blogConfig.author.avatar}
                  alt={blogConfig.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/20 flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {blogConfig.author.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{blogConfig.author.name}</h1>
              <p className="text-xl text-white/90 mb-4">{blogConfig.author.bio}</p>
              
              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-4">
                {blogConfig.author.social.github && (
                  <a
                    href={blogConfig.author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {blogConfig.author.social.twitter && (
                  <a
                    href={blogConfig.author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {blogConfig.author.social.linkedin && (
                  <a
                    href={blogConfig.author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {blogConfig.author.social.email && (
                  <a
                    href={`mailto:${blogConfig.author.social.email}`}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>关于我</h2>
            <p>
              你好！我是一名热爱技术的开发者，专注于前端开发和全栈技术。我喜欢探索新技术，
              分享学习心得，并通过这个博客记录我的技术成长历程。
            </p>

            <h2>技术栈</h2>
            <p>我主要使用以下技术栈进行开发：</p>
            <ul>
              <li><strong>前端：</strong>React, Next.js, TypeScript, Tailwind CSS</li>
              <li><strong>后端：</strong>Node.js, Express, Python, FastAPI</li>
              <li><strong>数据库：</strong>PostgreSQL, MongoDB, Redis</li>
              <li><strong>工具：</strong>Git, Docker, VS Code, Figma</li>
              <li><strong>云服务：</strong>Vercel, AWS, Google Cloud</li>
            </ul>

            <h2>兴趣爱好</h2>
            <p>
              除了编程，我还喜欢：
            </p>
            <ul>
              <li>📚 阅读技术书籍和博客</li>
              <li>🎵 听音乐和看电影</li>
              <li>🏃‍♂️ 跑步和健身</li>
              <li>📷 摄影和旅行</li>
              <li>🎮 偶尔玩游戏放松</li>
            </ul>

            <h2>博客目标</h2>
            <p>
              通过这个博客，我希望能够：
            </p>
            <ul>
              <li>分享我在技术学习过程中的心得体会</li>
              <li>记录项目开发中遇到的问题和解决方案</li>
              <li>与其他开发者交流学习，共同进步</li>
              <li>保持持续学习的习惯</li>
            </ul>

            <h2>联系我</h2>
            <p>
              如果你对我的文章有任何疑问，或者想要交流技术话题，欢迎通过以下方式联系我：
            </p>
            <ul>
              <li>📧 邮箱：{blogConfig.author.social.email}</li>
              <li>🐙 GitHub：{blogConfig.author.social.github}</li>
              <li>🐦 Twitter：{blogConfig.author.social.twitter}</li>
              <li>💼 LinkedIn：{blogConfig.author.social.linkedin}</li>
            </ul>

            <p>
              感谢你访问我的博客，希望我的文章对你有所帮助！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
