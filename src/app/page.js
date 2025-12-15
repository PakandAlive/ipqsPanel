"use client";

import { useState } from 'react';
import SearchInput from './components/SearchInput';
import ResultCard from './components/ResultCard';

export default function Home() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (ip) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        try {
            const res = await fetch(`/api/check?ip=${ip}`);
            const result = await res.json();

            if (result.success) {
                setData(result.data);
            } else {
                setError(result.message || '获取数据时出错');
            }
        } catch (err) {
            setError('网络错误，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen py-8 px-4">
            <div className="container-full">
                <header className="header-compact">
                    <div className="title-small">IP 风险扫描</div>
                    <div className="subtitle-small">实时欺诈检测与风险分析</div>
                </header>

                <SearchInput onSearch={handleSearch} isLoading={isLoading} />

                {error && (
                    <div className="error-message animate-fade-in">
                        {error}
                    </div>
                )}

                {data && <ResultCard data={data} />}
            </div>
        </main>
    );
}
