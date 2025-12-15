"use client";

import { useState } from 'react';

export default function SearchInput({ onSearch, isLoading }) {
    const [ip, setIp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ip.trim()) {
            onSearch(ip.trim());
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <div className="search-wrapper">
                    <input
                        type="text"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        placeholder="输入 IP 地址 (例如：8.8.8.8)"
                        className="search-input"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !ip.trim()}
                        className="search-btn"
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner" />
                                <span style={{ marginLeft: '0.5rem' }}>扫描中...</span>
                            </>
                        ) : (
                            '扫描 IP'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
