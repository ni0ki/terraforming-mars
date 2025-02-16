import {expect} from 'chai';
import {Game} from '../../../src/Game';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {TileType} from '../../../src/common/TileType';
import {MoholeAreaAres} from '../../../src/cards/ares/MoholeAreaAres';
import {SpaceBonus} from '../../../src/common/boards/SpaceBonus';
import {ARES_OPTIONS_NO_HAZARDS} from '../../ares/AresTestHelper';
import {TestPlayers} from '../../TestPlayers';
import {cast} from '../../TestingUtils';

describe('MoholeAreaAres', function() {
  it('Should play', function() {
    const card = new MoholeAreaAres();
    const player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();

    Game.newInstance('foobar', [player, redPlayer], player, ARES_OPTIONS_NO_HAZARDS);
    const action = cast(card.play(player), SelectSpace);
    const space = action.availableSpaces[0];
    action.cb(space);

    expect(space.tile && space.tile.tileType).to.eq(TileType.MOHOLE_AREA);
    expect(space.adjacency).to.deep.eq({bonus: [SpaceBonus.HEAT, SpaceBonus.HEAT]});
  });
});
