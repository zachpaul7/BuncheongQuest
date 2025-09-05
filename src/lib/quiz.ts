type Question = {
    q: string;
    choices: string[];
    answerIndex: number;
};

type Quiz = {
    id: string;      // "QR1" ...
    index: number;   // 0..6
    title: string;
    questions: Question[];
};

const quizzes: Quiz[] = [
    {
        id: "QR1", index: 0, title: "분청사기의 개념",
        questions: [
            {
                q: "분청도자기는 어떤 기법이 핵심인가?",
                choices: ["청화 안료 그림", "백토 분장 후 장식", "유약 없이 소성", "금박 입히기"],
                answerIndex: 1
            },
            {
                q: "분청도자기의 전성기는 대략 어느 시대?",
                choices: ["고구려", "고려 초기", "조선 전기", "조선 후기"],
                answerIndex: 2
            }
        ]
    },
    {
        id: "QR2", index: 1, title: "기법 파헤치기",
        questions: [
            {
                q: "상감기법 설명으로 맞는 것은?",
                choices: ["도자 표면 긁고 다른 흙/안료 메움", "유약을 전혀 쓰지 않음", "가마 밖에서 채색", "철화와 동일"],
                answerIndex: 0
            }
        ]
    },
    {
        id: "QR3", index: 2, title: "대표 장식",
        questions: [
            {
                q: "철화 분청에서 '철화'는 무엇을 뜻함?",
                choices: ["철판으로 누름", "철분 안료로 그림", "철 성분 많은 흙 사용", "철가루 뿌림"],
                answerIndex: 1
            }
        ]
    },
    {
        id: "QR4", index: 3, title: "형태와 용도",
        questions: [
            {
                q: "다완(찻사발)이 유명해진 이유로 적절한 것은?",
                choices: ["대량생산 쉬움", "소박한 미감과 사용성", "금박으로 호화로움", "유럽 수출 때문"],
                answerIndex: 1
            }
        ]
    },
    {
        id: "QR5", index: 4, title: "소성과 재료",
        questions: [
            {
                q: "분장에 쓰는 백토의 역할로 맞는 것은?",
                choices: ["내화도 상승", "표면 밝게 하고 장식 대비", "강도 저하", "유약 대체"],
                answerIndex: 1
            }
        ]
    },
    {
        id: "QR6", index: 5, title: "지역성과 변용",
        questions: [
            {
                q: "분청 도자 문화는 지역마다 장식이 조금씩 다른데, 이런 특성을 부르는 말로 적절한 것은?",
                choices: ["균질화", "지방화", "산업화", "표준화"],
                answerIndex: 1
            }
        ]
    },
    {
        id: "QR7", index: 6, title: "현대적 의의",
        questions: [
            {
                q: "분청의 미감과 가장 거리가 먼 키워드는?",
                choices: ["소박함", "즉흥성", "화려한 금속광택", "자유로운 선"],
                answerIndex: 2
            },
            {
                q: "체험형 전시에 적합한 이유는?",
                choices: ["복잡한 장치 필요", "짧은 학습-보상 루프", "고난도 이론 필요", "전문 가마 필수"],
                answerIndex: 1
            }
        ]
    }
];

export function getQuizById(id: string): Quiz {
    const q = quizzes.find(x => x.id === id);
    if (!q) {
        // fallback: 첫 퀴즈
        return quizzes[0];
    }
    return q;
}
