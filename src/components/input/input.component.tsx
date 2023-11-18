import css from './input.module.css';

export interface InputProps {
    readonly type: 'text' | 'password';
    readonly onChange: (data: string) => void;
    readonly placeholder: string;
}

export const Input = ({ type, onChange, placeholder }: InputProps) => {
    return (
        <input
            placeholder={placeholder}
            type={type}
            onChange={(e) => onChange(e.currentTarget.value)}
            className={css.input}
        />
    );
};
