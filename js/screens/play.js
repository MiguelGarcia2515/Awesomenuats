game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		me.audio.playTrack("m");

		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01");//show and loads the level to play on the webtsite

		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0,{});
		me.game.world.addChild(gameTimerManager, 0);

		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0,{});
		me.game.world.addChild(heroDeathManager, 0);

		var experienceManager = me.pool.pull("ExperienceManager", 0, 0,{});
		me.game.world.addChild(experienceManager, 0);

		var spendGold = me.pool.pull("SpendGold", 0, 0,{});
		me.game.world.addChild(spendGold, 0);

		game.data.minimap = me.pool.pull("minimap", 10, 10, {});
		me.game.world.addChild(game.data.minimap, 30);

		this.resetPlayer(10, 0);
		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill1");
		me.input.bindKey(me.input.KEY.W, "skill2");
		me.input.bindKey(me.input.KEY.E, "skill3");
		me.input.bindKey(me.input.KEY.RIGHT, "right");//moves player right
		me.input.bindKey(me.input.KEY.LEFT, "left");//moves player left
		me.input.bindKey(me.input.KEY.SPACE, "jump");//moves player jump
		me.input.bindKey(me.input.KEY.A, "attack");//makes player attack

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.audio.stopTrack();
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y){
		game.data.player = me.pool.pull("player", x, y, {});//actualy shows the player on the website
		me.game.world.addChild(game.data.player, 7);
		game.data.miniPlayer = me.pool.pull("miniplayer", 10, 10, {});
		me.game.world.addChild(game.data.miniPlayer, 31);

	}
	
});