import{_ as t,c as s,o as a,O as e}from"./chunks/framework.227b99ed.js";const y=JSON.parse('{"title":"Vue 3 Component","description":"","frontmatter":{"title":"Vue 3 Component","lang":"en-US"},"headers":[],"relativePath":"components/vue3/_props.md","filePath":"components/vue3/_props.md","lastUpdated":1686039301000}'),o={name:"components/vue3/_props.md"},n=e(`<h1 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h1><p>To make the component easier to work with there are a few <code>props</code> that wrap the <code>simulation</code> properties and methods.</p><h2 id="available-properties" tabindex="-1">Available Properties <a class="header-anchor" href="#available-properties" aria-label="Permalink to &quot;Available Properties&quot;">​</a></h2><table><thead><tr><th>Property</th><th>Type</th><th>Description</th><th>Docs</th></tr></thead><tbody><tr><td>dark</td><td><code>Boolean</code></td><td>whether to use the dark theme</td><td><a href="/template-api/template_styles.html#dark-mode">Docs</a></td></tr><tr><td>remoteOrigin</td><td><code>String</code></td><td>the remote origin from where to fetch templates</td><td><a href="/simulation-api/environment.html#remote-origin">Docs</a></td></tr><tr><td>selectedNodes</td><td><code>Array&lt;sring&gt;</code></td><td>the selected nodes</td><td><a href="/simulation-api/environment.html#selected-nodes">Docs</a></td></tr><tr><td>envGravity</td><td><code>Number</code></td><td>the gravity of the environment</td><td><a href="/simulation-api/environment.html#env-gravity">Docs</a></td></tr><tr><td>linkDistance</td><td><code>Number</code></td><td>the minimum distance of links</td><td><a href="/simulation-api/environment.html#link-distance">Docs</a></td></tr><tr><td>animationDuration</td><td><code>Number</code></td><td>the duration of animations</td><td><a href="/simulation-api/environment.html#animation-duration">Docs</a></td></tr><tr><td>draggableNodes</td><td><code>Boolean</code></td><td>whether nodes can be dragged</td><td><a href="/simulation-api/environment.html#draggable-nodes">Docs</a></td></tr><tr><td>zoomEnabled</td><td><code>Boolean</code></td><td>whether the zoom is enabled</td><td><a href="/simulation-api/move_and_zoom.html#zoom-enabled">Docs</a></td></tr><tr><td>zoomScaleExtent</td><td><code>Array&lt;nmber&gt;</code></td><td>the zoom scale extent</td><td><a href="/simulation-api/move_and_zoom.html#zoom-scale-extent">Docs</a></td></tr></tbody></table><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">GraphlyD3</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">graphly</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">:dark</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">true</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">remoteOrigin</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/templates</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">:selectedNodes</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[&#39;node-1&#39;, &#39;node-2&#39;]</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">:envGravity</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">-5000</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">:linkDistance</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">100</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">:animationDuration</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">500</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">:draggableNodes</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">true</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">:zoomEnabled</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">true</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#C792EA;">:zoomScaleExtent</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[0.1, 10]</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">	/&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div>`,6),l=[n];function p(r,c,d,i,D,F){return a(),s("div",null,l)}const h=t(o,[["render",p]]);export{y as __pageData,h as default};
