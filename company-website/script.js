// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // Hero轮播
    initHeroSlider();

    // 解决方案选项卡切换
    initTabs();

    // 案例筛选
    initCaseFilter();

    // 平滑滚动
    initSmoothScroll();

    // 导航栏滚动效果
    initNavbarScroll();
});

/**
 * Hero图片轮播
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const contents = document.querySelectorAll('.hero-slide-content');
    const dots = document.querySelectorAll('.hero-dot');

    if (slides.length === 0) return;

    let currentIndex = 0;
    let intervalId = null;
    const slideInterval = 5000; // 5秒切换一次

    function goToSlide(index) {
        // 移除当前活动状态
        slides[currentIndex].classList.remove('active');
        contents[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        // 计算新的索引
        currentIndex = index;

        // 添加新的活动状态
        slides[currentIndex].classList.add('active');
        contents[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }

    // 自动播放
    function startAutoplay() {
        intervalId = setInterval(nextSlide, slideInterval);
    }

    function stopAutoplay() {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }

    // 点击指示器切换
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        });
    });

    // 鼠标悬停暂停
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoplay);
        heroSection.addEventListener('mouseleave', startAutoplay);
    }

    // 开始自动播放
    startAutoplay();
}

/**
 * 初始化解决方案选项卡
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // 添加当前活动状态
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

/**
 * 初始化案例筛选功能
 */
function initCaseFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 筛选案例卡片
            caseCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * 初始化平滑滚动
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 导航栏滚动效果
 */
function initNavbarScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // 滚动超过100px时添加阴影
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });
}

/**
 * 数字动画效果
 * 用于统计数字的滚动显示
 */
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

/**
 * 观察器：当元素进入视口时触发动画
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // 如果是统计数字区域，触发数字动画
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    animateNumber(entry.target, target);
                }
            }
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.category-card, .case-card, .stat-number').forEach(el => {
    observer.observe(el);
});

/**
 * 智能助手浮窗对话功能 - 增强版
 */
document.addEventListener('DOMContentLoaded', function() {
    // 兼容首页大屏搜索框和其他页面导航栏搜索框
    const searchInput = document.getElementById('heroSearchInput') || document.getElementById('headerSearchInput');
    const searchBtn = document.getElementById('heroSearchBtn');
    const aiChatModal = document.getElementById('aiChatModal');
    const aiChatOverlay = document.getElementById('aiChatOverlay');
    const aiChatClose = document.getElementById('aiChatClose');
    const aiChatBody = document.getElementById('aiChatBody');
    const aiChatInput = document.getElementById('aiChatInput');
    const aiChatSend = document.getElementById('aiChatSend');

    if (!searchInput || !aiChatModal) return;

    // 扩展的客户案例数据 - 增加更多关键词和别名
    const caseData = [
        {
            id: 'gov-cloud',
            title: '某省级政务云平台',
            desc: '为某省打造统一的政务云平台，整合40+个委办局业务系统，实现数据共享和业务协同',
            category: 'government',
            tag: '政务',
            url: 'case-government.html',
            keywords: ['政府', '政务', '省级', '委办局', '数据共享', '业务协同', '公务员', '机关', '部门', '行政', '公共', '服务', '智慧城市', '一网通办']
        },
        {
            id: 'bank-core',
            title: '某城商行核心系统云化',
            desc: '帮助某城商行完成核心系统云原生改造，系统处理能力提升5倍，IT成本降低40%',
            category: 'finance',
            tag: '金融',
            url: 'case-bank.html',
            keywords: ['银行', '金融', '城商行', '核心系统', '云原生', '改造', '保险', '证券', '理财', '投资', '基金', '信用卡', '存款', '贷款', '支付', '交易', '风控']
        },
        {
            id: 'hospital-smart',
            title: '某三甲医院智慧医院',
            desc: '建设互联网医院平台和医疗影像云，实现远程诊疗和影像数据云端存储',
            category: 'healthcare',
            tag: '医疗',
            url: 'case-hospital.html',
            keywords: ['医院', '医疗', '三甲', '智慧医院', '互联网医院', '远程诊疗', '健康', '医生', '病人', '就诊', '挂号', '医保', '药店', '药品', '影像', 'CT', 'X光']
        },
        {
            id: 'edu-platform',
            title: '某省教育厅教育云平台',
            desc: '打造覆盖全省的教育云平台，服务2000+所学校，100万+师生',
            category: 'education',
            tag: '教育',
            url: 'case-education.html',
            keywords: ['教育', '学校', '教育厅', '师生', '云平台', '大学', '中学', '小学', '幼儿园', '高校', '学生', '老师', '教学', '课程', '在线学习', '培训']
        },
        {
            id: 'manufacturing-iot',
            title: '某汽车集团工业互联网平台',
            desc: '建设工业互联网平台，连接10万+台设备，实现生产过程可视化和预测性维护',
            category: 'manufacturing',
            tag: '制造',
            url: 'case-manufacturing.html',
            keywords: ['制造', '汽车', '工业', '互联网', '设备', '生产', '工厂', '车间', '流水线', '机械', '自动化', '质检', '能源', '电力', '钢铁', '化工']
        },
        {
            id: 'insurance-ai',
            title: '某保险公司智能理赔系统',
            desc: '基于AI技术打造智能理赔平台，理赔效率提升80%，欺诈识别准确率达95%以上',
            category: 'finance',
            tag: '金融',
            url: 'case-insurance.html',
            keywords: ['保险', '金融', '智能理赔', 'AI', '人工智能', '欺诈识别', '车险', '人寿', '健康险', '理赔', '保单', '投保']
        }
    ];

    // 扩展的解决方案数据
    const solutionData = [
        {
            id: 'gov-solution',
            title: '数字政务解决方案',
            desc: '基于云计算、大数据技术，构建统一政务云平台，实现数据共享、业务协同',
            category: 'government',
            tag: '政务',
            url: 'solution-government.html',
            keywords: ['政府', '政务', '数字政务', '云平台', '数据共享', '一网通办', '公务员', '机关', '行政审批', '便民服务', '智慧城市']
        },
        {
            id: 'finance-solution',
            title: '金融科技解决方案',
            desc: '为银行、保险、证券等金融机构提供安全合规的云计算服务',
            category: 'finance',
            tag: '金融',
            url: 'solution-finance.html',
            keywords: ['金融', '银行', '保险', '证券', '金融科技', '风控', '理财', '投资', '支付', '数字货币', '区块链']
        },
        {
            id: 'healthcare-solution',
            title: '智慧医疗解决方案',
            desc: '构建医疗信息化平台，实现医疗数据互联互通，提升医疗服务质量',
            category: 'healthcare',
            tag: '医疗',
            url: 'solution-healthcare.html',
            keywords: ['医疗', '医院', '智慧医疗', '互联网医院', '影像云', '健康', '医保', '远程医疗', '电子病历', '医疗大数据']
        },
        {
            id: 'education-solution',
            title: '智慧教育解决方案',
            desc: '打造教育云平台，推动教育信息化2.0，实现优质教育资源共享',
            category: 'education',
            tag: '教育',
            url: 'solution-education.html',
            keywords: ['教育', '学校', '智慧教育', '在线教育', '智慧校园', '教学', '课程', '学习平台', '教育云', '校园网']
        },
        {
            id: 'manufacturing-solution',
            title: '智能制造解决方案',
            desc: '助力制造企业数字化转型，实现生产智能化、管理精细化',
            category: 'manufacturing',
            tag: '制造',
            url: 'solution-manufacturing.html',
            keywords: ['制造', '工业', '智能制造', '工业互联网', '数字孪生', '工厂', '车间', 'MES', 'ERP', '工业4.0', '物联网']
        },
        {
            id: 'retail-solution',
            title: '新零售解决方案',
            desc: '重构人货场，实现线上线下融合，提升消费者体验和运营效率',
            category: 'retail',
            tag: '零售',
            url: 'solution-retail.html',
            keywords: ['零售', '新零售', '电商', '线上线下', '全渠道', '超市', '商场', '便利店', '供应链', '物流', '仓储', '会员', '营销']
        }
    ];

    // 闲聊对话库
    const chatResponses = {
        greetings: {
            patterns: ['你好', '您好', 'hello', 'hi', 'hey', '在吗', '有人吗', '在不在'],
            responses: [
                '你好！很高兴为您服务 😊 请问有什么可以帮您？',
                '您好！我是智云科技智能助手，有什么可以帮您的吗？',
                'Hello! 有什么我可以协助您的吗？'
            ]
        },
        thanks: {
            patterns: ['谢谢', '感谢', '多谢', 'thx', 'thanks', '谢谢帮助'],
            responses: [
                '不客气！很高兴能帮到您 😊',
                '不用谢！有问题随时找我~',
                '为您服务是我的荣幸！还有其他需要吗？'
            ]
        },
        goodbye: {
            patterns: ['再见', '拜拜', 'bye', 'goodbye', '下次见', '回头见'],
            responses: [
                '再见！祝您生活愉快！👋',
                '拜拜！有需要随时找我哦~',
                '再见！期待下次为您服务！'
            ]
        },
        about: {
            patterns: ['你是谁', '你叫什么', '介绍', '关于', '智云', '公司', '简介'],
            responses: [
                '<p>我是智云科技的智能助手！🤖</p><p style="margin-top:8px">智云科技专注于企业数字化转型，提供云计算、大数据、人工智能等全方位技术服务。</p><p style="margin-top:8px">我们已服务 <strong>500+</strong> 客户，覆盖政务、金融、医疗、教育、制造等多个行业。</p>'
            ]
        },
        help: {
            patterns: ['帮助', 'help', '怎么用', '功能', '能做什么', '有什么功能'],
            responses: [
                '<p>我可以帮您：</p><ul style="margin-top:8px; padding-left: 20px;"><li>🔍 搜索客户案例和解决方案</li><li>💡 了解产品服务和价格</li><li>📞 获取技术支持联系方式</li><li>💬 闲聊解闷 😊</li></ul><p style="margin-top:8px">试试输入：<strong>政府</strong>、<strong>金融</strong>、<strong>医疗</strong> 等关键词</p>'
            ]
        },
        joke: {
            patterns: ['笑话', '讲个笑话', '搞笑', '幽默', '开心'],
            responses: [
                '程序员最讨厌的四件事：1. 写注释 2. 写文档 3. 别人不写注释 4. 别人不写文档 😂',
                '为什么程序员总是分不清圣诞节和万圣节？因为 Oct 31 = Dec 25 🎃🎄',
                '一个程序员走进酒吧，举起双手说："我要一杯啤酒。"酒保问："一杯还是两杯？"程序员说："一杯。"然后举起双手。🍺'
            ]
        },
        mood: {
            patterns: ['开心', '难过', '郁闷', '烦', '累', '辛苦', '压力大'],
            responses: [
                '工作再忙也要注意休息哦！喝杯咖啡，放松一下 ☕',
                '加油！相信自己，您是最棒的！💪',
                '深呼吸，放轻松。需要我帮您找些解决方案分散注意力吗？ 😊'
            ]
        }
    };

    // 打开浮窗
    function openChatModal() {
        aiChatModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            aiChatInput.focus();
        }, 300);
    }

    // 关闭浮窗
    function closeChatModal() {
        aiChatModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 搜索输入框点击打开浮窗
    if (searchInput) {
        searchInput.addEventListener('click', (e) => {
            e.preventDefault();
            openChatModal();
        });

        // 搜索输入框聚焦时也打开浮窗
        searchInput.addEventListener('focus', (e) => {
            e.preventDefault();
            openChatModal();
            searchInput.blur();
        });
    }

    // 搜索按钮点击
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            openChatModal();
        });
    }

    // 热门搜索标签点击
    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const query = tag.dataset.query;
            openChatModal();
            setTimeout(() => {
                addUserMessage(query);
                performSearch(query);
            }, 400);
        });
    });

    // 关闭按钮
    aiChatClose.addEventListener('click', closeChatModal);
    aiChatOverlay.addEventListener('click', closeChatModal);

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiChatModal.classList.contains('active')) {
            closeChatModal();
        }
    });

    // 添加用户消息
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-chat-message';
        messageDiv.innerHTML = `
            <div class="ai-chat-bubble ai-chat-bubble-user">
                <p>${text}</p>
            </div>
        `;
        aiChatBody.appendChild(messageDiv);
        scrollToBottom();
    }

    // 添加机器人消息
    function addBotMessage(html) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-chat-message';
        messageDiv.innerHTML = `
            <div class="ai-chat-avatar-small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
            </div>
            <div class="ai-chat-bubble ai-chat-bubble-bot">
                ${html}
            </div>
        `;
        aiChatBody.appendChild(messageDiv);
        scrollToBottom();
    }

    // 滚动到底部
    function scrollToBottom() {
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }

    // 智能匹配函数 - 支持模糊匹配
    function smartMatch(query, item) {
        const lowerQuery = query.toLowerCase();

        // 1. 完全匹配关键词
        if (item.keywords.some(k => k.includes(lowerQuery))) return true;

        // 2. 标题匹配
        if (item.title.toLowerCase().includes(lowerQuery)) return true;

        // 3. 描述匹配
        if (item.desc.toLowerCase().includes(lowerQuery)) return true;

        // 4. 标签匹配
        if (item.tag.toLowerCase().includes(lowerQuery)) return true;

        // 5. 模糊匹配 - 关键词包含查询
        for (let keyword of item.keywords) {
            if (keyword.includes(lowerQuery) || lowerQuery.includes(keyword)) return true;
        }

        return false;
    }

    // 执行搜索
    function performSearch(query) {
        if (!query || query.trim() === '') return;

        const lowerQuery = query.toLowerCase();

        // 搜索客户案例 - 使用智能匹配
        const matchedCases = caseData.filter(item => smartMatch(query, item)).slice(0, 3);

        // 搜索解决方案 - 使用智能匹配
        const matchedSolutions = solutionData.filter(item => smartMatch(query, item)).slice(0, 3);

        displaySearchResults(matchedCases, matchedSolutions, query);
    }

    // 显示搜索结果
    function displaySearchResults(cases, solutions, query) {
        if (cases.length === 0 && solutions.length === 0) {
            // 如果没有匹配结果，尝试推荐相关内容
            const suggestions = getSuggestions(query);
            if (suggestions) {
                addBotMessage(suggestions);
            } else {
                addBotMessage(`
                    <p>抱歉，没有找到与 "<strong>${query}</strong>" 完全匹配的内容。</p>
                    <p style="margin-top: 8px;">您可以尝试搜索：</p>
                    <div style="margin-top: 8px;">
                        <span class="suggestion-chip" data-query="政府">🏛️ 政府</span>
                        <span class="suggestion-chip" data-query="金融">🏦 金融</span>
                        <span class="suggestion-chip" data-query="医疗">🏥 医疗</span>
                        <span class="suggestion-chip" data-query="教育">📚 教育</span>
                        <span class="suggestion-chip" data-query="制造">🏭 制造</span>
                    </div>
                `);
            }
            return;
        }

        let html = `<p>为您找到以下与 "<strong>${query}</strong>" 相关的内容：</p>`;

        // 客户案例
        if (cases.length > 0) {
            html += '<p style="margin-top: 12px; font-weight: 600; color: var(--text-secondary);">客户案例</p>';
            cases.forEach(item => {
                html += createResultHtml(item, 'case');
            });
        }

        // 解决方案
        if (solutions.length > 0) {
            html += '<p style="margin-top: 16px; font-weight: 600; color: var(--text-secondary);">解决方案</p>';
            solutions.forEach(item => {
                html += createResultHtml(item, 'solution');
            });
        }

        addBotMessage(html);

        // 绑定点击事件
        setTimeout(() => {
            aiChatBody.querySelectorAll('.ai-chat-result, .suggestion-chip').forEach(link => {
                link.addEventListener('click', (e) => {
                    const query = e.target.dataset.query;
                    if (query) {
                        addUserMessage(query);
                        setTimeout(() => performSearch(query), 300);
                    } else {
                        closeChatModal();
                    }
                });
            });
        }, 100);
    }

    // 获取推荐内容
    function getSuggestions(query) {
        const lowerQuery = query.toLowerCase();

        // 行业相关推荐
        const industryMap = {
            '政府': ['government'],
            '政务': ['government'],
            '金融': ['finance'],
            '银行': ['finance'],
            '医疗': ['healthcare'],
            '医院': ['healthcare'],
            '教育': ['education'],
            '学校': ['education'],
            '制造': ['manufacturing'],
            '工厂': ['manufacturing'],
            '零售': ['retail'],
            '电商': ['retail']
        };

        for (let [key, categories] of Object.entries(industryMap)) {
            if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
                const relatedCases = caseData.filter(item => categories.includes(item.category));
                const relatedSolutions = solutionData.filter(item => categories.includes(item.category));

                if (relatedCases.length > 0 || relatedSolutions.length > 0) {
                    let html = `<p>猜您想找的是 "<strong>${key}</strong>" 相关内容：</p>`;
                    if (relatedCases.length > 0) {
                        html += '<p style="margin-top: 8px; font-weight: 600; color: var(--text-secondary);">客户案例</p>';
                        relatedCases.slice(0, 2).forEach(item => {
                            html += createResultHtml(item, 'case');
                        });
                    }
                    if (relatedSolutions.length > 0) {
                        html += '<p style="margin-top: 8px; font-weight: 600; color: var(--text-secondary);">解决方案</p>';
                        relatedSolutions.slice(0, 2).forEach(item => {
                            html += createResultHtml(item, 'solution');
                        });
                    }
                    return html;
                }
            }
        }
        return null;
    }

    // 创建结果HTML
    function createResultHtml(item, type) {
        const iconSvg = type === 'case'
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>';

        return `
            <a href="${item.url}" class="ai-chat-result">
                <div class="ai-chat-result-icon">${iconSvg}</div>
                <div class="ai-chat-result-info">
                    <div class="ai-chat-result-title">${item.title}</div>
                    <div class="ai-chat-result-desc">${item.desc}</div>
                    <span class="ai-chat-result-tag">${item.tag}</span>
                </div>
            </a>
        `;
    }

    // 检查是否是闲聊
    function checkChatResponse(query) {
        const lowerQuery = query.toLowerCase();

        for (let category of Object.values(chatResponses)) {
            for (let pattern of category.patterns) {
                if (lowerQuery.includes(pattern)) {
                    const responses = category.responses;
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }
        return null;
    }

    // 发送消息处理
    function handleSend() {
        const text = aiChatInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        aiChatInput.value = '';

        setTimeout(() => {
            // 先检查是否是闲聊
            const chatResponse = checkChatResponse(text);
            if (chatResponse) {
                addBotMessage(chatResponse);
                return;
            }

            // 否则执行搜索
            performSearch(text);
        }, 300);
    }

    // 发送按钮点击
    aiChatSend.addEventListener('click', handleSend);

    // 输入框回车发送
    aiChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // 快捷建议点击
    aiChatBody.addEventListener('click', (e) => {
        const suggestion = e.target.closest('.ai-chat-suggestions li');
        if (suggestion) {
            const query = suggestion.dataset.query;
            addUserMessage(query);
            setTimeout(() => {
                performSearch(query);
            }, 300);
        }
    });

    // 添加快捷标签样式
    const style = document.createElement('style');
    style.textContent = `
        .suggestion-chip {
            display: inline-block;
            padding: 6px 12px;
            margin: 4px;
            background: #f0f4ff;
            border-radius: 16px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .suggestion-chip:hover {
            background: var(--primary-color);
            color: white;
        }
    `;
    document.head.appendChild(style);

    // 快捷操作按钮
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.dataset.query;
            addUserMessage(query);
            setTimeout(() => {
                // 根据快捷按钮类型回复不同内容
                if (query === '产品咨询') {
                    addBotMessage(`
                        <p>我们提供以下产品服务：</p>
                        <p style="margin-top: 8px;">💻 <strong>云计算</strong> - 弹性云服务器、容器服务等</p>
                        <p>💾 <strong>数据存储</strong> - 对象存储、块存储、文件存储</p>
                        <p>🤖 <strong>人工智能</strong> - 机器学习平台、AI算法服务</p>
                        <p>🔒 <strong>安全服务</strong> - 云防火墙、DDoS防护</p>
                        <p style="margin-top: 12px;"><a href="products.html" style="color: var(--primary-color);">查看全部产品 →</a></p>
                    `);
                } else if (query === '解决方案') {
                    addBotMessage(`
                        <p>我们为以下行业提供解决方案：</p>
                        ${createResultHtml(solutionData[0], 'solution')}
                        ${createResultHtml(solutionData[1], 'solution')}
                        ${createResultHtml(solutionData[2], 'solution')}
                        <p style="margin-top: 12px;"><a href="solutions.html" style="color: var(--primary-color);">查看全部方案 →</a></p>
                    `);
                } else if (query === '价格报价') {
                    addBotMessage(`
                        <p>我们的定价根据您的具体需求而定：</p>
                        <p style="margin-top: 8px;">✅ 公有云服务 - 按需付费，低至 ¥0.08/小时</p>
                        <p>✅ 私有云部署 - 根据规模定制报价</p>
                        <p>✅ 混合云方案 - 灵活组合，最优性价比</p>
                        <p style="margin-top: 12px;">如需详细报价，请联系我们的销售顾问：</p>
                        <p>📞 400-888-8888</p>
                    `);
                } else if (query === '技术支持') {
                    addBotMessage(`
                        <p>我们提供全方位的技术支持：</p>
                        <p style="margin-top: 8px;">📞 7×24小时客服热线：400-888-8888</p>
                        <p>✉️ 技术支持邮箱：support@zhiyun.com</p>
                        <p>💬 在线客服：工作日 9:00-18:00</p>
                        <p>📖 技术文档：<a href="#" style="color: var(--primary-color);">查看文档中心</a></p>
                    `);
                }
            }, 300);
        });
    });
});
