import {expect} from 'chai';
import {ApiPlayer} from '../../src/routes/ApiPlayer';
import {Game} from '../../src/Game';
import {TestPlayers} from '../TestPlayers';
import {MockResponse} from './HttpMocks';
import {PlayerViewModel} from '../../src/common/models/PlayerModel';
import {RouteTestScaffolding} from './RouteTestScaffolding';

describe('ApiPlayer', function() {
  let scaffolding: RouteTestScaffolding;
  let res: MockResponse;

  beforeEach(() => {
    scaffolding = new RouteTestScaffolding();
    res = new MockResponse();
  });

  it('fails game not found', async () => {
    scaffolding.url = '/api/player?id=googoo';
    await scaffolding.asyncGet(ApiPlayer.INSTANCE, res);
    expect(res.content).eq('Not found');
  });

  it('pulls player', async () => {
    const player = TestPlayers.BLACK.newPlayer();
    scaffolding.url = '/api/player?id=' + player.id;
    const game = Game.newInstance('game-id', [player], player);
    scaffolding.ctx.gameLoader.add(game);
    await scaffolding.asyncGet(ApiPlayer.INSTANCE, res);
    const response: PlayerViewModel = JSON.parse(res.content);
    expect(response.id).eq(player.id);
  });
});
