const emptyHook = (async () => {})
class CompilerHooksWebpackPlugin {

	constructor({ before, after, watchRun, assetEmitted, done }) {
		this.beforeHook = before || emptyHook
		this.afterHook = after || emptyHook
		this.watchRunHook = watchRun || emptyHook
		this.assetEmittedHook = assetEmitted || emptyHook
		this.doneHook = done || emptyHook
	}

	apply(compiler) {
		const self = this
		
		compiler.hooks.watchRun.tapPromise('AfterEmitPlugin', function() {
			return self.watchRunHook(...arguments)
		})

		compiler.hooks.beforeCompile.tapPromise('AfterEmitPlugin', function() {
			return self.beforeHook(...arguments)
		})

		compiler.hooks.afterEmit.tapPromise('AfterEmitPlugin', function() {
			return self.afterHook(...arguments)
		})

		compiler.hooks.assetEmitted.tapPromise('AfterEmitPlugin', function() {
			return self.assetEmittedHook(...arguments)
		})

		compiler.hooks.done.tapPromise('AfterEmitPlugin', function() {
			return self.doneHook(...arguments)
		})
	}
}

module.exports = CompilerHooksWebpackPlugin