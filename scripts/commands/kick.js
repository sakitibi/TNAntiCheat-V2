import { Util } from '../util/util';
import { CommandError } from '../util/CommandError';
import { Command } from '../util/Command';

const kickCommand = new Command({
  name: 'kick',
  description: 'プレイヤーをKickします',
  args: [ '<name: playerName> [reason: string] [expects: boolean]' ],
  aliases: [],
  permission: (player) => Util.isOP(player)
}, (origin, args) => {
  const [ _playerName, reason = '-', expect ] = args;
  if (!_playerName) throw new CommandError('プレイヤー名を入力してください');
  const playerName = Util.parsePlayerName(_playerName);
  
  const player = Util.getPlayerByName(playerName, expect === 'true');
  if (!player) throw new CommandError(`プレイヤー ${playerName} が見つかりませんでした`);
  if (origin.isPlayerOrigin() && origin.sender.name === player.name) throw new CommandError('自分をkickすることはできません');
  Util.kick(player, `Reason: ${reason}`);
  
  origin.broadcast(Util.decorate(`§7${origin.name} >> §fプレイヤー: §c${player.name}§r をkickしました\n§7Reason: §r${reason}`));
  Util.writeLog({ type: 'command.kick', message: `Kicked by ${origin.name}\nReason: ${reason}` }, player);
});

export default kickCommand;