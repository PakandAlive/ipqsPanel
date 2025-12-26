"use client";

import { useState } from 'react';

export default function ResultCard({ data }) {
    const [showJson, setShowJson] = useState(false);

    if (!data) return null;

    const score = data.fraud_score || 0;

    // Determine risk level and colors
    let scoreColor, scoreColorLight, riskLevel;
    if (score >= 75) {
        scoreColor = '#ef4444';
        scoreColorLight = '#fca5a5';
        riskLevel = '高风险';
    } else if (score >= 30) {
        scoreColor = '#f59e0b';
        scoreColorLight = '#fbbf24';
        riskLevel = '中等风险';
    } else {
        scoreColor = '#10b981';
        scoreColorLight = '#34d399';
        riskLevel = '低风险';
    }

    // Helper to check if value is valid
    const isValid = (val) => val && val !== 'N/A' && val !== 'Premium required.' && val !== 'Premium required';

    return (
        <div className="result-container" style={{ '--score-color': scoreColor, '--score-color-light': scoreColorLight }}>

            {/* Header Section */}
            <div className="result-header">
                <h2 className="ip-title">{data.ip_check || data.IP || '未知 IP'}</h2>
                {/* Show Hostname if available and different from IP */}
                {data.host && data.host !== (data.ip_check || data.IP) && (
                    <div className="ip-subtitle" style={{
                        color: '#888',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        fontFamily: 'monospace',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                    }}>
                        {data.host}
                    </div>
                )}
                <div className="ip-meta">
                    {isValid(data.country_code) && (
                        <div className="meta-item">
                            <span>国家：</span>
                            <span>{data.country_code}</span>
                        </div>
                    )}
                    {isValid(data.ISP) && (
                        <div className="meta-item">
                            <span>运营商：</span>
                            <span>{data.ISP}</span>
                        </div>
                    )}
                    {isValid(data.organization) && (
                        <div className="meta-item">
                            <span>组织：</span>
                            <span>{data.organization}</span>
                        </div>
                    )}
                    {isValid(data.ASN) && (
                        <div className="meta-item">
                            <span>ASN：</span>
                            <span>{data.ASN}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="bento-grid">

                {/* Row 2: Fraud Score + Risk Indicators */}
                {/* Fraud Score Card */}
                <div className="bento-card bento-row-2">
                    <div className="score-display">
                        <div className="score-label">欺诈分数</div>
                        <div className="score-value">{score}</div>
                        <div style={{
                            marginTop: '1rem',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: scoreColor
                        }}>
                            {riskLevel}
                        </div>
                    </div>
                </div>

                {/* Risk Indicators Card */}
                <div className="bento-card bento-row-2" style={{ gridColumn: 'span 2' }}>
                    <div className="card-title">
                        <span>风险指标</span>
                    </div>
                    <div className="risk-grid">
                        <RiskBadge label="代理" active={data.proxy} />
                        <RiskBadge label="VPN" active={data.vpn} />
                        <RiskBadge label="Tor" active={data.tor} />
                        <RiskBadge label="活跃 VPN" active={data.active_vpn} />
                        <RiskBadge label="活跃 Tor" active={data.active_tor} />
                        <RiskBadge label="机器人" active={data.bot_status} />
                        <RiskBadge label="爬虫" active={data.is_crawler} />
                        <RiskBadge label="滥用记录" active={data.recent_abuse} />
                    </div>
                </div>

                {/* Row 3: Location + Connection + Device */}
                {/* Location Card */}
                {(isValid(data.city) || isValid(data.region) || isValid(data.latitude)) && (
                    <div className="bento-card bento-row-3">
                        <div className="card-title">
                            <span>位置信息</span>
                        </div>
                        <div className="card-content">
                            {isValid(data.city) && <DetailRow label="城市" value={data.city} />}
                            {isValid(data.region) && <DetailRow label="地区" value={data.region} />}
                            {isValid(data.country_code) && <DetailRow label="国家" value={data.country_code} />}
                            {isValid(data.latitude) && (
                                <div className="detail-row">
                                    <span className="detail-label">坐标</span>
                                    <a
                                        href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="detail-value map-link"
                                    >
                                        {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
                                    </a>
                                </div>
                            )}
                            {isValid(data.timezone) && <DetailRow label="时区" value={data.timezone} />}
                        </div>
                    </div>
                )}

                {/* Connection Card */}
                <div className="bento-card bento-row-3">
                    <div className="card-title">
                        <span>连接信息</span>
                    </div>
                    <div className="card-content">
                        <DetailRow label="移动网络" value={data.mobile ? '是' : '否'} highlight={data.mobile} />
                        {isValid(data.timezone) && <DetailRow label="时区" value={data.timezone} />}
                        {isValid(data.connection_type) && <DetailRow label="连接类型" value={data.connection_type} />}
                    </div>
                </div>

                {/* Device Card */}
                {(isValid(data.operating_system) || isValid(data.browser)) && (
                    <div className="bento-card bento-row-3">
                        <div className="card-title">
                            <span>设备信息</span>
                        </div>
                        <div className="card-content">
                            {isValid(data.operating_system) && <DetailRow label="操作系统" value={data.operating_system} />}
                            {isValid(data.browser) && <DetailRow label="浏览器" value={data.browser} />}
                            {isValid(data.device_brand) && <DetailRow label="品牌" value={data.device_brand} />}
                            {isValid(data.device_model) && <DetailRow label="型号" value={data.device_model} />}
                        </div>
                    </div>
                )}
            </div>

            {/* JSON Toggle */}
            <div className="json-toggle">
                <button
                    onClick={() => setShowJson(!showJson)}
                    className="json-button"
                >
                    <span>{showJson ? '−' : '+'}</span>
                    <span>{showJson ? '隐藏' : '查看'} 原始 JSON</span>
                </button>

                {showJson && (
                    <div className="json-content animate-fade-in">
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

function RiskBadge({ label, active }) {
    return (
        <div className={`risk-badge ${active ? 'active' : 'inactive'}`}>
            {label}
            {active && <span style={{ marginLeft: '0.25rem' }}>●</span>}
        </div>
    );
}

function DetailRow({ label, value, highlight }) {
    if (!value || value === 'N/A' || value === 'Premium required.') return null;

    return (
        <div className="detail-row">
            <span className="detail-label">{label}</span>
            <span className="detail-value" style={{ color: highlight ? '#00d4ff' : undefined }}>
                {value}
            </span>
        </div>
    );
}
