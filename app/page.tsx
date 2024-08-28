"use client";
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout';

export default function Home() {
  const router = useRouter();

  const goTo1 = () => {
    router.push('/caesar');
  };
  const goTo2 = () => {
    router.push('/playFair');
  };

  return (
    <Layout>  
      <div>
        <div className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center font-mono">
          <h1>Ciphers</h1>
        </div>
        <div className="p-6 rounded-lg shadow-lg flex justify-around">
          <div 
            onClick={goTo1} 
            className="w-1/3 h-64 text-xl p-4 border rounded shadow-md mb-4 flex items-center justify-center transition-transform transform hover:scale-105 cursor-pointer font-mono"
          >
            Caesar Cipher
          </div>
          <div 
            onClick={goTo2} 
            className="w-1/3 h-64 text-xl p-4 border rounded shadow-md mb-4 flex items-center justify-center transition-transform transform hover:scale-105 cursor-pointer font-mono"
          >
            PlayFair Cipher
          </div>
        </div>
      </div>
    </Layout>  
  );
}
