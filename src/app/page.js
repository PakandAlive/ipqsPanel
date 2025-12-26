"use client";

import { useState, useEffect } from 'react';
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
            const url = ip ? `/api/check?ip=${ip}` : '/api/check';
            const res = await fetch(url);
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

    // Auto-detect IP on load
    useEffect(() => {
        handleSearch();
    }, []);

    // 判断是否有数据或错误，决定布局方式
    const hasContent = data || error;

    return (
        <main className={hasContent ? "main-with-content" : "main-centered"}>
            <div className={hasContent ? "container-full" : "container-centered"}>
                <header className={hasContent ? "header-compact" : "header-center"}>
                    <div className={hasContent ? "title-small" : "title-large"}>IP 风险扫描</div>
                    <div className={hasContent ? "subtitle-small" : "subtitle-large"}>实时欺诈检测与风险分析</div>
                </header>

                <SearchInput onSearch={handleSearch} isLoading={isLoading} detectedIp={data?.IP || data?.host} />

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
