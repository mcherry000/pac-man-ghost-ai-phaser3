import Phaser from 'phaser'

import { IGhostAI, getOppositeDirection, getOrderedDirections } from './IGhostAI'
import Hero from '../Hero'
import Ghost from '../Ghost'

import { determineDirectionFromTarget } from './utils/determineDirectionFromTarget'

import { TileSize } from './consts/TileConfig'

export default class InterceptHeroAI implements IGhostAI
{
	private readonly hero: Hero
	private readonly ghost: Ghost
	private readonly board: Phaser.Tilemaps.DynamicTilemapLayer

	get speed()
	{
		return 100
	}

	get targetPosition()
	{
		const heroDir = this.hero.facingVector
		const tx = this.hero.x + TileSize * (heroDir.x * 4)
		const ty = this.hero.y + TileSize * (heroDir.y * 4)

		return { x: tx, y: ty }
	}

	constructor(hero: Hero, ghost: Ghost, board: Phaser.Tilemaps.DynamicTilemapLayer)
	{
		this.hero = hero
		this.ghost = ghost
		this.board = board
	}

	pickDirection()
	{
		const backwardsDirection = getOppositeDirection(this.ghost.currentDirection)
		const directions = getOrderedDirections(dir => dir !== backwardsDirection)

		const targetPos = this.targetPosition
		const tx = targetPos.x
		const ty = targetPos.y

		return determineDirectionFromTarget(this.ghost.x, this.ghost.y, tx, ty, directions, this.board)
	}
}
