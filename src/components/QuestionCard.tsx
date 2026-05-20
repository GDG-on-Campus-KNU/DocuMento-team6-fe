import { useState } from 'react';
import Card from '@/components/Card';

type DifficultyLevel = '입문' | '기본' | '심화';
type TechArea = 'CS' | 'Spring' | 'JPA' | 'Redis' | string;

type Props = {
  index: number;
  question: string;
  difficulty: DifficultyLevel;
  techArea: TechArea;
  followUpQuestions?: string[];
  sourceFile?: string;
  className?: string;
};

const DIFFICULTY_BADGE_CLASS: Record<DifficultyLevel, string> = {
  입문: 'badge badge-green',
  기본: 'badge badge-purple',
  심화: 'badge badge-gray',
};

export default function QuestionCard({
  index,
  question,
  difficulty,
  techArea,
  followUpQuestions = [],
  sourceFile,
  className = '',
}: Props) {
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);

  const difficultyClass = DIFFICULTY_BADGE_CLASS[difficulty] ?? 'badge badge-gray';

  return (
    <Card className={className}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {/* 질문 제목 */}
        <p
          style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: 600,
            color: 'var(--color-primary)',
            lineHeight: 1.5,
          }}
        >
          <span style={{ marginRight: 'var(--spacing-xs)' }}>{index}.</span>
          {question}
        </p>

        {/* 뱃지 */}
        <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
          <span className={difficultyClass}>{difficulty}</span>
          <span className="badge badge-gray">{techArea}</span>
        </div>

        {/* 꼬리질문 토글 */}
        {followUpQuestions.length > 0 && (
          <div>
            <button
              onClick={() => setIsFollowUpOpen((prev) => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: 'var(--font-size-sm)',
                fontWeight: 500,
                color: 'var(--color-primary)',
                cursor: 'pointer',
              }}
            >
              꼬리질문 ({followUpQuestions.length})
              <span
                style={{
                  display: 'inline-block',
                  transition: 'transform var(--transition-base)',
                  transform: isFollowUpOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                ▾
              </span>
            </button>

            {isFollowUpOpen && (
              <ul
                style={{
                  marginTop: 'var(--spacing-sm)',
                  paddingLeft: 'var(--spacing-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-xs)',
                }}
              >
                {followUpQuestions.map((fq, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-muted)',
                      listStyleType: 'disc',
                    }}
                  >
                    {fq}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* 출처 파일 */}
        {sourceFile && (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)',
            }}
          >
            <span>📄</span>
            {sourceFile}
          </p>
        )}
      </div>
    </Card>
  );
}
