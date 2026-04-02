let questions = [];
let currentIdx = 0;
let answers = [];
let currentLang = 'en';

const translations = {
    en: {
        title: "Israel 2026 Political Mapper",
        'header-title': "Israel Election Mapper",
        'header-year': "April 2026",
        'header-desc': "Determine your position in the 26th Knesset landscape.",
        'landing-desc1': "This tool helps you map your political coordinates for the 2026 Israeli Elections based on your views.",
        'landing-desc2': "Disclaimer: This site was created with the assistance of AI. It does not replace independent research. We encourage you to research the parties, politicians, and issues yourself.",
        'landing-desc3': "Privacy First: We do not use any cookies, save your data, or track you in any way. Your answers never leave your device.",
        'start-btn': "Start Quiz",
        'scale-disagree': "Strongly Disagree",
        'scale-agree': "Strongly Agree",
        'next-btn': "Next Question",
        'show-results-btn': "Show Results",
        'results-title': "Your Political Coordinates",
        'chart-2d': "2D Political Compass",
        'chart-4d': "4D Identity Dimensions",
        'restart-btn': "Restart",
        'party-match-title': "Your Party Matches",
        'mandates-title': "Current Predicted Mandates",
        'match-fit': "Closest alignment:",
        'match-unfit': "Biggest disagreement:",
        labels: {
            'Security': 'Security', 'Secularism': 'Secularism', 'Anti-Status-Quo': 'Anti-Status-Quo', 'Zionism': 'Zionism',
            'You': 'You',
            'Left': 'Left ↔ Right', 'Lib': 'Liberal ↔ Authoritarian'
        }
    },
    he: {
        title: "ממפה פוליטי ישראל 2026",
        'header-title': "ממפה בחירות ישראל",
        'header-year': "אפריל 2026",
        'header-desc': "גלה את מיקומך במפת הכנסת ה-26.",
        'landing-desc1': "כלי זה עוזר לך למפות את הקואורדינטות הפוליטיות שלך לבחירות 2026 בישראל.",
        'landing-desc2': "שימו לב: אתר זה נוצר בעזרת בינה מלאכותית. הוא אינו מהווה תחליף למחקר עצמאי, ואנו ממליצים לחקור בעצמך על המפלגות, הפוליטיקאים והנושאים השונים.",
        'landing-desc3': "פרטיות מעל הכל: איננו משתמשים בעוגיות (Cookies), איננו שומרים את הנתונים שלך ואיננו עוקבים אחריך בשום צורה. התשובות שלך נשארות על המכשיר שלך בלבד.",
        'start-btn': "התחל שאלון",
        'scale-disagree': "מסכים לחלוטין", // Reversed visually for RTL range input consistency
        'scale-agree': "מתנגד לחלוטין",
        'next-btn': "השאלה הבאה",
        'show-results-btn': "הצג תוצאות",
        'results-title': "הקואורדינטות הפוליטיות שלך",
        'chart-2d': "מצפן פוליטי 2D",
        'chart-4d': "ממדי זהות 4D",
        'restart-btn': "התחל מחדש",
        'party-match-title': "התאמות המפלגות שלך",
        'mandates-title': "מנדטים חזויים כעת",
        'match-fit': "הסכמה החזקה ביותר:",
        'match-unfit': "הפער הגדול ביותר:",
        labels: {
            'Security': 'ביטחון', 'Secularism': 'חילוניות', 'Anti-Status-Quo': 'אנטי-סטטוס-קוו', 'Zionism': 'ציונות',
            'You': 'את/ה',
            'Left': 'שמאל ↔ ימין', 'Lib': 'ליברלי ↔ סמכותני'
        }
    },
    ru: {
        title: "Политическая карта Израиля 2026",
        'header-title': "Компас выборов в Израиле",
        'header-year': "Апрель 2026",
        'header-desc': "Определите свою позицию в ландшафте 26-го Кнессета.",
        'landing-desc1': "Этот инструмент помогает определить ваши политические координаты для выборов в Израиле 2026 года.",
        'landing-desc2': "Обратите внимание: этот сайт был создан с помощью ИИ. Он не заменяет самостоятельного изучения, и мы рекомендуем вам изучить партии, политиков и темы самостоятельно.",
        'landing-desc3': "Конфиденциальность: мы не используем файлы cookie, не сохраняем ваши данные и никак не отслеживаем вас. Ваши ответы остаются полностью анонимными и только на вашем устройстве.",
        'start-btn': "Начать тест",
        'scale-disagree': "Категорически не согласен",
        'scale-agree': "Полностью согласен",
        'next-btn': "Следующий вопрос",
        'show-results-btn': "Показать результаты",
        'results-title': "Ваши политические координаты",
        'chart-2d': "2D Политический компас",
        'chart-4d': "4D Измерения идентичности",
        'restart-btn': "Начать заново",
        'party-match-title': "Ваши совпадения с партиями",
        'mandates-title': "Текущие прогнозы мандатов",
        'match-fit': "Наибольшее согласие:",
        'match-unfit': "Главное разногласие:",
        labels: {
            'Security': 'Безопасность', 'Secularism': 'Светскость', 'Anti-Status-Quo': 'Анти-статус-кво', 'Zionism': 'Сионизм',
            'You': 'Вы',
            'Left': 'Левые ↔ Правые', 'Lib': 'Либерал ↔ Авторитарист'
        }
    }
};

const radarParties = [
    { label: 'Likud', data: [4, 2, 1, 4], color: '#1f77b4' },
    { label: 'The Democrats', data: [1, 5, 5, 4], color: '#e377c2' },
    { label: 'Yesh Atid', data: [2, 4, 5, 4], color: '#ff7f0e' },
    { label: 'National Unity', data: [3, 3, 4, 5], color: '#2ca02c' },
    { label: 'Yisrael Beiteinu', data: [4, 5, 5, 5], color: '#d62728' },
    { label: 'Bennett (New Right)', data: [4, 3, 4, 5], color: '#17becf' },
    { label: 'Rel. Zionism / Otzma', data: [5, 1, 1, 5], color: '#8c564b' },
    { label: 'Shas', data: [3, 1, 1, 3], color: '#9467bd' },
    { label: 'UTJ', data: [2, 1, 1, 2], color: '#8c564b' },
    { label: 'Ra\'am', data: [1, 2, 3, 1], color: '#7f7f7f' },
    { label: 'Hadash-Ta\'al', data: [1, 4, 5, 1], color: '#333333' }
];

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    
    // Update active button
    document.querySelectorAll('#language-selector button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`#language-selector button[onclick="setLanguage('${lang}')"]`).classList.add('active');

    // Update static texts
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === 'TITLE') document.title = translations[lang][key];
            else el.innerText = translations[lang][key];
        }
    });

    if (questions.length > 0 && document.getElementById('quiz-container').style.display === 'block') {
        showQuestion();
    } else if (document.getElementById('results-container').style.display === 'block') {
        calculateResults();
    }
}

async function init() {
    const res = await fetch('questions.json');
    questions = await res.json();
    setLanguage(currentLang);
    // Start fetching election data strictly in the background as soon as the page loads
    prefetchMandates().catch(console.error);
}

function startQuiz() {
    document.getElementById('landing-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    document.getElementById('question-text').innerText = questions[currentIdx].text[currentLang];
    document.getElementById('scale-input').value = 3;
    
    if (currentIdx === questions.length - 1) {
        document.getElementById('next-btn').innerText = translations[currentLang]['show-results-btn'];
    } else {
        document.getElementById('next-btn').innerText = translations[currentLang]['next-btn'];
    }
}

function nextQuestion() {
    const val = parseInt(document.getElementById('scale-input').value);
    answers.push({ ...questions[currentIdx], score: val });
    
    if (currentIdx < questions.length - 1) {
        currentIdx++;
        showQuestion();
    } else {
        calculateResults();
    }
}

function calculateResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';

    const getAvg = (dim) => {
        const filtered = answers.filter(a => a.dimension === dim);
        return filtered.reduce((acc, curr) => acc + curr.score, 0) / filtered.length;
    };

    // 4D Scores
    const security = getAvg('security');
    const religion = getAvg('religion');
    const leadership = 6 - getAvg('leadership'); // Invert: 1 is pro-Bibi, 5 is anti
    const zionism = getAvg('zionism');

    // 2D Coordinates (Standard Compass Mapping)
    const x = (security - 3) * 2.5; // X: -5 (Left) to +5 (Right)
    const y = (3 - religion) * 2.5; // Y: -5 (Secular/Lib) to +5 (Auth/Rel)

    const tr = translations[currentLang];
    
    const userProfile = [security, religion, leadership, zionism];
    const dimensions = ['Security', 'Secularism', 'Anti-Status-Quo', 'Zionism'];
    
    // Calculate distances to parties
    const partyMatches = radarParties.map(p => {
        let totalDist = 0;
        let maxDiff = -1;
        let minDiff = 10;
        let maxDiffDim = 0;
        let minDiffDim = 0;
        
        p.data.forEach((val, idx) => {
            const diff = Math.abs(val - userProfile[idx]);
            totalDist += diff;
            if (diff > maxDiff) { maxDiff = diff; maxDiffDim = idx; }
            if (diff < minDiff) { minDiff = diff; minDiffDim = idx; }
        });
        
        return { ...p, totalDist, maxDiffDim, minDiffDim };
    });

    partyMatches.sort((a, b) => a.totalDist - b.totalDist);
    
    // Add Mandate Fetch Here Inside calculateResults (or globally after load)
    renderMandatesChart(tr);

    const listHtml = partyMatches.map((p, idx) => {
        const transLabel = getTranslatedParty(p.label, currentLang);
        // Max possible distance across 4 dimensions is roughly 16. Translate to %
        const matchPercent = Math.max(0, Math.round(100 - (p.totalDist / 16) * 100)); 
        const fitDim = tr.labels[dimensions[p.minDiffDim]];
        const unfitDim = tr.labels[dimensions[p.maxDiffDim]];
        
        return `<div class="party-item" style="border-inline-start-color: ${p.color};">
            <div class="party-name">${idx + 1}. ${transLabel} (${matchPercent}%)</div>
            <div class="party-stats">
                <div><span class="match-excellent">${tr['match-fit']}</span> ${fitDim}</div>
                <div><span class="match-poor">${tr['match-unfit']}</span> ${unfitDim}</div>
            </div>
        </div>`;
    }).join('');

    document.getElementById('party-match-list').innerHTML = `<h2 style="text-align:center; margin-bottom: 20px;">${tr['party-match-title']}</h2>${listHtml}`;

    drawRadar(security, religion, leadership, zionism, tr);
    drawCompass(x, y, tr);
    
    if (window.pollingDataConfig) {
        updateMandatesTitle(tr);
    }
}

function updateMandatesTitle(tr) {
    const config = window.pollingDataConfig;
    const baseTitle = tr['mandates-title'];
    if (!config || !config.source) return;
    
    if (config.sourceLink) {
        document.getElementById('mandates-title').innerHTML = `${baseTitle} (<a href="${config.sourceLink}" target="_blank" style="color: inherit; text-decoration: underline;">${config.source}</a>)`;
    } else {
        document.getElementById('mandates-title').innerText = `${baseTitle} (${config.source})`;
    }
}

async function fetchWikipediaMandates() {
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&page=Opinion_polling_for_the_2026_Israeli_legislative_election&prop=text&format=json&origin=*';
    const res = await fetch(url);
    const data = await res.json();
    const htmlString = data.parse.text['*'];
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    
    // Find the first sortable polling table
    const tables = doc.querySelectorAll('table.wikitable.sortable');
    if (!tables.length) throw new Error("No polling table found");
    const table = tables[0];
    
    const rows = Array.from(table.querySelectorAll('tr'));
    
    // Parse table DOM into a matrix to resolve rowspans/colspans gracefully
    const matrix = [];
    rows.forEach((row, r) => {
        matrix[r] = matrix[r] || [];
        let c = 0;
        Array.from(row.children).forEach(cell => {
            while (matrix[r][c] !== undefined) c++;
            
            // Extract the most descriptive label
            let labelText = cell.textContent.trim().toLowerCase();
            const a = cell.querySelector('a');
            if (a && a.title && !a.title.includes('does not exist')) {
                labelText = a.title.trim().toLowerCase();
            }
            
            const rs = parseInt(cell.getAttribute('rowspan') || 1);
            const cs = parseInt(cell.getAttribute('colspan') || 1);
            const rawContent = cell.textContent.trim();
            
            for (let ir = 0; rs > ir; ir++) {
                for (let ic = 0; cs > ic; ic++) {
                    matrix[r + ir] = matrix[r + ir] || [];
                    matrix[r + ir][c + ic] = { label: labelText || '', raw: rawContent, cell };
                }
            }
            c += cs;
        });
    });

    // The first row containing real <td> data
    const firstDataRowIndex = rows.findIndex(row => row.querySelector('td'));
    if (firstDataRowIndex === -1) throw new Error("No data rows");

    const headers = matrix[firstDataRowIndex - 1];

    const pollsToAverage = [];
    const seenPublishers = new Set();
    const NUM_POLLS_TO_AVERAGE = 3;

    for (let r = firstDataRowIndex; r < matrix.length; r++) {
        const dataRow = matrix[r];
        if (!dataRow || !dataRow[0]) continue; 
        
        let publisher = (dataRow[1] && dataRow[1].raw) ? dataRow[1].raw.replace(/\[\d+\]/g, '').trim() : ''; 
        if (!publisher || publisher.includes('unknown') || publisher === '?') publisher = "Poll-" + r;
        
        if (seenPublishers.has(publisher)) continue;

        const rowMandates = {};
        let sumRelZionismOtzma = 0;
        let totalSeatsObserved = 0;

        headers.forEach((headerConf, i) => {
            if (!headerConf || !dataRow[i]) return;
            
            // Reconstruct the full column label by checking all header rows above
            // This prevents issues where the bottom-most cell is empty due to rowspan quirks
            let colLabelStr = '';
            for(let hr=0; hr < firstDataRowIndex; hr++) {
                if(matrix[hr] && matrix[hr][i] && matrix[hr][i].label) {
                // Ignore text from the Gov/Opp bloc total header cells
                const innerLabel = matrix[hr][i].label.toLowerCase();
                if(innerLabel !== 'gov.' && innerLabel !== 'opp.') {
                    colLabelStr += ' ' + innerLabel;
                }}
            }

            let colLabel = colLabelStr.toLowerCase();
            const valStr = dataRow[i].raw || '';
            
            if (colLabel.includes('fieldwork') || colLabel.includes('publisher') || colLabel.includes('polling') || colLabel.includes('date') || colLabel.includes('gov') || colLabel.includes('opp') || colLabel.includes('bloc')) return;

            const val = parseInt(valStr.replace(/[^0-9]/g, '')) || 0;
            if (val === 0) return;
            
            let matched = true;
            if (colLabel.includes('likud')) rowMandates['Likud'] = val;
            else if (colLabel.includes('yesh atid')) rowMandates['Yesh Atid'] = val;
            else if (colLabel.includes('national unity') || colLabel.includes('gantz') || colLabel.includes('blue and')) rowMandates['National Unity'] = val;
            else if (colLabel.includes('yisrael beiteinu')) rowMandates['Yisrael Beiteinu'] = val;
            else if (colLabel.includes('democrats') || colLabel.includes('labor') || colLabel.includes('meretz') || colLabel.includes('golan')) {
                rowMandates['The Democrats'] = (rowMandates['The Democrats'] || 0) + val;
            }
            else if (colLabel.includes('bennett') || colLabel.includes('new right') || colLabel.includes('yamina') || colLabel.includes('yashar')) rowMandates['Bennett (New Right)'] = val;
            else if (colLabel.includes('religious zionism')) sumRelZionismOtzma += val;
            else if (colLabel.includes('otzma yehudit')) sumRelZionismOtzma += val;
            else if (colLabel.includes('shas')) rowMandates['Shas'] = val;
            else if (colLabel.includes('united torah') || colLabel.includes('utj')) rowMandates['UTJ'] = val;
            else if (colLabel.includes('ra\'am') || colLabel.includes('united arab list') || colLabel.includes('ual')) rowMandates['Ra\'am'] = val;
            else if (colLabel.includes('hadash') || colLabel.includes('ta\'al')) rowMandates['Hadash-Ta\'al'] = val;
            else matched = false;

            if (matched || val > 0) { 
               // Blocks totals don't usually map to a single party, block totals run > 40 typically
               if(val < 45) totalSeatsObserved += val; 
            }
        });

        if (sumRelZionismOtzma > 0) {
            rowMandates['Rel. Zionism / Otzma'] = sumRelZionismOtzma;
        }

        // A valid poll row should map out to around 120 seats combined
        // If it's very low (e.g. < 90), it might be an empty/pending row or partial scenario
        if (totalSeatsObserved < 90) {
            continue;
        }

        pollsToAverage.push({ publisher, mandates: rowMandates });
        seenPublishers.add(publisher);

        if (pollsToAverage.length >= NUM_POLLS_TO_AVERAGE) break;
    }

    if (pollsToAverage.length === 0) throw new Error("No valid poll data rows found");

    // Compute the average for each party across the selected polls
    const averagedMandates = {};
    const partyKeys = ['Likud', 'Yesh Atid', 'National Unity', 'Yisrael Beiteinu', 'The Democrats', 'Bennett (New Right)', 'Rel. Zionism / Otzma', 'Shas', 'UTJ', 'Ra\'am', 'Hadash-Ta\'al'];
    
    partyKeys.forEach(party => {
        let sum = 0;
        let count = 0;
        pollsToAverage.forEach(poll => {
            if (poll.mandates[party] !== undefined) {
                sum += poll.mandates[party];
                count++;
            }
        });
        if (count > 0) {
            averagedMandates[party] = Math.round(sum / count);
        }
    });

    let sourcePub = "Recent Poll";
    if (pollsToAverage.length > 0) {
        const pNames = pollsToAverage.map(p => {
            // Strip out weird date residues or bracket references if any survived
            let nm = p.publisher.split('\n')[0].replace(/\[\d+\]/g, '').trim();
            if(!nm || nm.toLowerCase() === "unknown") nm = "Poll";
            // Check if it's too long, then substring it so the title isn't giant
            return nm.length > 20 ? nm.substring(0, 18) + '...' : nm;
        });
        sourcePub = "Avg. of " + pollsToAverage.length + " Polls (" + pNames.join(", ") + ")";
    }

    return {
        updatedAt: new Date().toISOString(),
        source: sourcePub,
        sourceLink: "https://en.wikipedia.org/wiki/Opinion_polling_for_the_2026_Israeli_legislative_election",
        mandates: averagedMandates
    };
}

async function prefetchMandates() {
    if (window.pollingDataPromise) return window.pollingDataPromise;
    window.pollingDataPromise = (async () => {
        try {
            window.pollingDataConfig = await fetchWikipediaMandates();
        } catch (e) {
            console.warn('Real-time Wikipedia scraping failed, falling back to local mandates.json:', e);
            let res = await fetch('mandates.json');
            window.pollingDataConfig = await res.json();
        }
    })();
    return window.pollingDataPromise;
}

async function renderMandatesChart(tr) {
    if (!window.pollingDataConfig) {
        try {
            await prefetchMandates();
        } catch (err) {
            console.error('Failed to load any mandates data:', err);
            document.getElementById('mandates-container').style.display = 'none';
            return;
        }
    }
    
    updateMandatesTitle(tr);

    const mData = window.pollingDataConfig.mandates;
    const sortedParties = radarParties
        .filter(p => mData[p.label])
        .map(p => ({
            label: getTranslatedParty(p.label, currentLang),
            mandates: mData[p.label] || 0,
            color: p.color
        }))
        .sort((a, b) => b.mandates - a.mandates); // Largest first

    if (window.mandatesChartInstance) window.mandatesChartInstance.destroy();
    
    // Unhide container
    document.getElementById('mandates-container').style.display = 'block';

    window.mandatesChartInstance = new Chart(document.getElementById('mandatesChart'), {
        type: 'bar',
        data: {
            labels: sortedParties.map(p => p.label + ' (' + p.mandates + ')'),
            datasets: [{
                label: 'Mandates',
                data: sortedParties.map(p => p.mandates),
                backgroundColor: sortedParties.map(p => p.color),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: currentLang === 'he' ? 'y' : 'y', // Horizontal is better for text labels
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 40 // Set reasonably based on average Knesset major parties
                }
            }
        }
    });
}

function getTranslatedParty(label, lang) {
    const pTr = { // Simple party translation dict
        "Likud": {"he": "הליכוד", "ru": "Ликуд"},
        "The Democrats": {"he": "הדמוקרטים - גולן/מרצ", "ru": "Демократы"},
        "Yesh Atid": {"he": "יש עתיד", "ru": "Еш Атид"},
        "National Unity": {"he": "המחנה הממלכתי", "ru": "Государственный лагерь"},
        "Yisrael Beiteinu": {"he": "ישראל ביתנו", "ru": "НДИ"},
        "Bennett (New Right)": {"he": "בנט - הימין החדש", "ru": "Беннет"},
        "Rel. Zionism / Otzma": {"he": "הציונות הדתית / עוצמה", "ru": "Религ. сионизм / Оцма"},
        "Shas": {"he": "ש\"ס", "ru": "ШАС"},
        "UTJ": {"he": "יהדות התורה", "ru": "Яадут ха-Тора"},
        "Ra'am": {"he": "רע\"ם", "ru": "РААМ"},
        "Hadash-Ta'al": {"he": "חד\"ש-תע\"ל", "ru": "ХАДАШ-ТААЛ"}
    };
    return (pTr[label] && pTr[label][lang]) || label;
}

function drawRadar(s, r, l, z, tr) {
    // Preserve hidden state from existing chart
    const existingHiddenState = {};
    if (window.radarChartInstance) {
        window.radarChartInstance.data.datasets.slice(1).forEach((ds, i) => {
            existingHiddenState[i] = ds.hidden;
        });
    }

    const partyDatasets = radarParties.map((p, i) => ({
        label: getTranslatedParty(p.label, currentLang),
        data: p.data,
        fill: true,
        backgroundColor: p.color + '33', // 20% opacity hex
        borderColor: p.color,
        hidden: existingHiddenState[i] !== undefined ? existingHiddenState[i] : true // Hidden by default
    }));

    // Destroy existing chart if it exists to allow re-render
    if (window.radarChartInstance) window.radarChartInstance.destroy();

    window.radarChartInstance = new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
            labels: [tr.labels['Security'], tr.labels['Secularism'], tr.labels['Anti-Status-Quo'], tr.labels['Zionism']],
            datasets: [
                { label: tr.labels['You'], data: [s, r, l, z], fill: true, backgroundColor: 'rgba(0, 94, 184, 0.2)', borderColor: '#005eb8' },
                ...partyDatasets
            ]
        },
        options: {
            scales: { 
                r: { 
                    min: 1, max: 5,
                    pointLabels: { font: { size: 14, weight: 'bold' } },
                    ticks: { font: { size: 12 } }
                } 
            },
            plugins: {
                legend: { display: false } // Hide Chart.js legend, we'll use checkboxes
            }
        }
    });

    const checkboxesContainer = document.getElementById('radar-checkboxes');
    checkboxesContainer.innerHTML = ''; // Clear existing
    window.radarChartInstance.data.datasets.slice(1).forEach((dataset, index) => {
        const label = document.createElement('label');
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '5px';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = !dataset.hidden;
        
        checkbox.addEventListener('change', (e) => {
            const chartDataset = window.radarChartInstance.data.datasets[index + 1];
            chartDataset.hidden = !e.target.checked;
            window.radarChartInstance.update();
        });

        const colorBox = document.createElement('div');
        colorBox.style.width = '12px';
        colorBox.style.height = '12px';
        colorBox.style.backgroundColor = dataset.borderColor;
        
        label.appendChild(checkbox);
        label.appendChild(colorBox);
        label.appendChild(document.createTextNode(dataset.label));
        checkboxesContainer.appendChild(label);
    });
}

function drawCompass(x, y, tr) {
    const parties = [
        { label: 'Likud', x: 3.5, y: 3.0, color: '#1f77b4' },
        { label: 'The Democrats', x: -4.0, y: -4.0, color: '#e377c2' },
        { label: 'Yesh Atid', x: -1.5, y: -3.5, color: '#ff7f0e' },
        { label: 'National Unity', x: 1.0, y: -1.0, color: '#2ca02c' },
        { label: 'Yisrael Beiteinu', x: 3.5, y: -4.5, color: '#d62728' },
        { label: 'Bennett (New Right)', x: 2.5, y: -1.5, color: '#17becf' },
        { label: 'Rel. Zionism / Otzma', x: 4.8, y: 4.8, color: '#8c564b' },
        { label: 'Shas', x: 1.5, y: 4.5, color: '#9467bd' },
        { label: 'UTJ', x: 1.0, y: 4.8, color: '#8c564b' },
        { label: 'Ra\'am', x: -3.5, y: 3.0, color: '#7f7f7f' },
        { label: 'Hadash-Ta\'al', x: -4.5, y: -2.0, color: '#333333' }
    ];

    const partyDatasets = parties.map(p => ({
        label: getTranslatedParty(p.label, currentLang),
        data: [{ x: p.x, y: p.y }],
        backgroundColor: p.color,
        pointStyle: 'rectRot',
        pointRadius: 6
    }));

    const compassPlugin = {
        id: 'compassPlugin',
        beforeDraw: (chart) => {
            const {ctx, chartArea: {top, bottom, left, right}, scales: {x, y}} = chart;
            const x0 = x.getPixelForValue(0);
            const y0 = y.getPixelForValue(0);

            ctx.save();
            // Auth-Left (Red)
            ctx.fillStyle = 'rgba(255, 153, 153, 0.4)';
            ctx.fillRect(left, top, x0 - left, y0 - top);
            // Auth-Right (Blue)
            ctx.fillStyle = 'rgba(153, 194, 255, 0.4)';
            ctx.fillRect(x0, top, right - x0, y0 - top);
            // Lib-Left (Green)
            ctx.fillStyle = 'rgba(153, 221, 153, 0.4)';
            ctx.fillRect(left, y0, x0 - left, bottom - y0);
            // Lib-Right (Yellow)
            ctx.fillStyle = 'rgba(255, 255, 153, 0.4)';
            ctx.fillRect(x0, y0, right - x0, bottom - y0);
            ctx.restore();
        }
    };

    if (window.compassChartInstance) window.compassChartInstance.destroy();

    window.compassChartInstance = new Chart(document.getElementById('compassChart'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: tr.labels['You'],
                data: [{x: x, y: y}],
                backgroundColor: 'black',
                pointRadius: 8,
                pointBorderColor: 'white',
                pointBorderWidth: 2
            }, ...partyDatasets]
        },
        plugins: [compassPlugin],
        options: {
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 16, font: { size: 13 }, usePointStyle: true, padding: 15 }
                }
            },
            scales: {
                x: {
                    min: -5, max: 5,
                    title: { display: true, text: tr.labels['Left'], font: { size: 15, weight: 'bold' } },
                    ticks: { font: { size: 13, weight: 'bold' } },
                    grid: {
                        color: (ctx) => ctx.tick.value === 0 ? '#333' : '#ddd',
                        lineWidth: (ctx) => ctx.tick.value === 0 ? 2 : 1
                    }
                },
                y: {
                    min: -5, max: 5,
                    title: { display: true, text: tr.labels['Lib'], font: { size: 15, weight: 'bold' } },
                    ticks: { font: { size: 13, weight: 'bold' } },
                    grid: {
                        color: (ctx) => ctx.tick.value === 0 ? '#333' : '#ddd',
                        lineWidth: (ctx) => ctx.tick.value === 0 ? 2 : 1
                    }
                }
            }
        }
    });
}

init();