import { genLinkToImgProxy, linkToName } from '../../../utils/img.utils';
import { Game, formatDate } from '../timeslots/timeslots.model';
import css from './reservated-games.module.css';

export interface ReservetedGamesProps {
    readonly games: Array<Game>;
    readonly datetime: string;
}

export const ReservetedGames = ({ games }: ReservetedGamesProps) => {
    if (games.length < 0) return null;
    console.log(games);
    return (
        <div className={css.wrap}>
            {games.map((el) => (
                <div className={css.item}>
                    <span className={css.title}>{el.title}</span>
                    <img
                        src={genLinkToImgProxy({
                            name: linkToName(el.images[0].link),
                            width: 180,
                            height: 0,
                        })}
                        alt=""
                        className={css.img}
                    />
                    <span>{formatDate(el.datetime)}</span>
                </div>
            ))}
        </div>
    );
};
