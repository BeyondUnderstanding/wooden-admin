import { Game } from '../timeslots/timeslots.model';
import css from './reservated-games.module.css';

export interface ReservetedGamesProps {
    readonly games: Array<Game>;
    readonly datetime: string;
}

export const ReservetedGames = ({ games }: ReservetedGamesProps) => {
    if (games.length < 0) return null;
    return (
        <div className={css.wrap}>
            {games.map((el) => (
                <div className={css.item}>
                    <span>{el.title}</span>
                    <img src={el.images[0].link} alt="" className={css.img} />
                </div>
            ))}
        </div>
    );
};
