import { Loader } from '../../../components/loader/loader.component';
import { Table } from '../../../components/table/table.component';
import { Games as IGames } from '../domain/model/game.model';
import css from './games.module.css';

interface GamesProps {
    readonly games: ReadonlyArray<IGames>;
    readonly isLoadingExtraOrders: boolean;
}

export const Games = ({ games, isLoadingExtraOrders }: GamesProps) => {
    return (
        <div className={css.wrap}>
            <Table
                headers={['№', 'Название', 'Цена', 'Удалена', 'Бонусная игра']}
                cells={games}
                slagToOpen="/game/"
            />
            {isLoadingExtraOrders && <Loader />}
        </div>
    );
};
