export const articleContents: Record<number, string> = {
 1: `
<p>Vue 3 带来了全新的组合式 API，相比 Vue 2 的 Options API，它在代码组织、逻辑复用和类型推导方面都有显著提升。Vue 3 带来了全新的组合式 API，相比 Vue 2 的 Options API，它在代码组织、逻辑复用和类型推导方面都有显著提升。
</p>
<h2>1. 组合式 API 是什么？</h2>
<p>组合式 API 允许我们使用函数的方式来组织组件逻辑。</p>
<pre><code class="language-ts">import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  }
}</code></pre>
<h2>2. 为什么需要它</h2>
<ul>
  <li>逻辑可以按功能聚合</li>
  <li>更容易复用：抽成 composable</li>
  <li>对 TypeScript 更友好</li>
</ul>
<blockquote>组合式 API 不是替代品，而是另一种组织方式。</blockquote>
`,
}