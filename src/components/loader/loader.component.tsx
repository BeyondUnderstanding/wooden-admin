import css from './loader.module.css';

export const Loader = () => {
    return (
        <svg className={css.spinner} viewBox="0 0 50 50">
            <circle
                className={css.path}
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
            ></circle>
        </svg>
    );
};
