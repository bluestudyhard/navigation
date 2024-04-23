<div id="content_views" class="markdown_views prism-atelier-sulphurpool-light">
                    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                        <path stroke-linecap="round" d="M5,0 0,2.5 5,5z" id="raphael-marker-block" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>
                    </svg>
                    <p>unplugin-vue-components 是一款按需自动导入<a href="https://so.csdn.net/so/search?q=Vue%E7%BB%84%E4%BB%B6&amp;spm=1001.2101.3001.7020" target="_blank" class="hl hl-1" data-report-click="{&quot;spm&quot;:&quot;1001.2101.3001.7020&quot;,&quot;dest&quot;:&quot;https://so.csdn.net/so/search?q=Vue%E7%BB%84%E4%BB%B6&amp;spm=1001.2101.3001.7020&quot;,&quot;extra&quot;:&quot;{\&quot;searchword\&quot;:\&quot;Vue组件\&quot;}&quot;}" data-tit="Vue组件" data-pretit="vue组件">Vue组件</a>的库。支持 Vue2 和 Vue3，同时支持组件和指令。使用此插件库后，不再需要手动导入组件，插件会自动识别按需导入组件以及对应样式，我们只需要像全局组件那样使用即可。</p> 
<p>当然上面说的并不严谨，此库并非全项目导入我们的组件，也会根据一些配置来限制导入组件的范围。下面我们先说下在项目中是如何使用的。</p> 
<p><strong>当前项目采用的是 Vue(3.2.16) + Vite(3.2.2) + Ts(4.5.5) + unplugin-vue-components(0.22.11)</strong></p> 
<h3><a name="t0"></a><a id="_6"></a>使用步骤</h3> 
<h4><a name="t1"></a><a id="_7"></a>安装</h4> 
<pre data-index="0" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  npm i unplugin-vue-components -D
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li></ul></pre> 
<h4><a name="t2"></a><a id="viteconfigts__13"></a>vite.config.ts 配置</h4> 
<pre data-index="1" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  import { ConfigEnv, UserConfig } from 'vite'
  import Components from 'unplugin-vue-components/vite'
  import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
  export default ({ _mode }: ConfigEnv): UserConfig =&gt; {
    return {
      base: './',
      plugins: [
        vue(),
        Components({
          resolvers: [ElementPlusResolver({ importStyle: "sass" })]
        })
      ]
    }
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li></ul></pre> 
<p><strong>在 plugins 中添加 ElementPlusResolver 解析器，此时我们在使用 ElementPlus 中组件时就无需 import 导入，可直接在 template 使用</strong></p> 
<h4><a name="t3"></a><a id="tsconfigjson__34"></a>tsconfig.json 配置</h4> 
<pre data-index="2" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  {
    "compilerOptions": {},
    "include": ["components.d.ts"],
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li></ul></pre> 
<p>以上全部设置完成后会在根目录下生成 components.d.ts，并会自动更新此类型声明文件，此时我们就可以正常开发了。</p> 
<p>坦率的说，在大部分项目中大家应该都是这样配置的，虽然这样配置并没有错，但前提是您必须知道它正在发挥着什么作用。<br> 我们习惯把全局组件放到 src/components 文件夹下并导出注册到全局，有一天您新增了一个组件但忘记注册到全局了，令人不可思议的是你正在 template 模版中使用它。随着组件使用次数的增加，您终于发现了这个问题。先是后背一阵冷汗，项目都上线了，这是要祭天的节奏啊，强装镇静但颤抖的手还是让同事发现了一些异常，通过在本地运行了几遍都很正常才发现这不是通往祭天的路，一知半解的您此时也不太确定要不要把它再注册到全局，毕竟好多地方都在用。平复好心情以后您终于发现了这篇文章，恭喜您！在接下来的2分钟里我将为你揭晓答案，请准备好瓜子花生，我们这就发车了。</p> 
<h3><a name="t4"></a><a id="_47"></a>配置分析</h3> 
<p>上面的 vite.config.ts 中 Components 的设置等同于下面的配置。如：</p> 
<pre data-index="3" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  import { ConfigEnv, UserConfig } from 'vite'
  import Components from 'unplugin-vue-components/vite'
  import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
  export default ({ _mode }: ConfigEnv): UserConfig =&gt; {
    return {
      base: './',
      plugins: [
        vue(),
        Components({
          dts: true,
          // 要搜索组件的目录
          dirs: ['src/components'],
          // 组件有效扩展名
          extensions: ['vue'],
          // 按需自动导入 elementPlus 组件
          resolvers: [
            ElementPlusResolver({ importStyle: 'sass' })
          ],
        })
      ]
    }
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li></ul></pre> 
<p>以上配置发挥着两个作用</p> 
<ul><li>按需导入 elementPlus 组件</li><li>按需递归导入 src/components 下所有后缀名为 vue 的组件</li></ul> 
<p>看到这里你可能只用了30秒就明白了为什么你没有注册到全局，然而还可以正常在 template 模版中使用了。没错你确实明白了，你也必须要明白否则下一个疑问可能就不会涌上心头？</p> 
<p>你应该要有这样的疑问？使用了 unplugin-vue-components 插件库，是不是就不需要全局组件了？是不是就不能使用全局组件了？是不是全局组件和此库必须选其一呢？</p> 
<p>我来试着回答一下，使用 unplugin-vue-components 库全部按需导入真的很香，完全支持这么干。您也肯定猜到了，或者您也肯定迫不及待的想知道但是了。没错这里必须有但是。像进度条、空布局、表单/表格以及一些项目独有且频繁使用的组件我们可以把它们做成全局组件，这样做更有意义并更符合逻辑。怎么办三个字飘然而过？</p> 
<p>unplugin-vue-components 库肯定也想到了这个问题，都是一群成年人开发的库，都是一群世界顶级的技术天才开发的库，怎么可能会让我们做选择题？成年人的世界那是我都要。当你想要一探究竟时，整个宇宙都会合力助你。兜兜转转终于发现 dirs 属性可能能帮我们实现愿望。</p> 
<p>在上面的代码中我们知道 dirs 和 extensions 都有默认值，它们表示的意思是 <strong>在 dirs 指定的目录下按需导入以 extensions 指定的后缀名的组件</strong>。这句话虽然有点绕，但此时你也应该恍然大悟。您真的懂了吗？可能懂了但真的懂了要怎么做了吗？还是烦请看一看我的解决方式吧，觉得有用就用上，觉得没用就当图个乐吧。</p> 
<h3><a name="t5"></a><a id="_91"></a>全局组件和局部组件共存的两种方式</h3> 
<h4><a name="t6"></a><a id="_93"></a>第一种方式</h4> 
<ul><li>在 src/components 目录下新建 localComponents 文件夹，里面存放所有需要 按需导入 的组件即：局部组件</li><li>修改 dirs 路径为 dirs: [‘src/components/localComponents’]</li></ul> 
<p>此时按需导入就 <strong>只会</strong> 搜索我们指定的 <strong>dirs</strong> 路径，这也是我 <strong>比较推荐</strong> 的写法。</p> 
<p><strong>我的建议是</strong>: globalComponents 全局组件文件夹我们最好建上，因为如果我们不创建，目录虽然看起来更清晰一些，但这只体现在我们开发人员都知道每一个目录作用的前提下，假如新来一个同事，我们又没有告诉他每个文件夹的含义，他在创建 局部组件 时是很有可能直接在 components 目录下新建，而压根就没有注意到 localComponents 文件夹的存在，如果我们添加了 globalComponents 文件下，那新来的同事肯定会 <strong>思考</strong> 一下每个文件夹含义，并根据文件夹内其他组件模版来创建组件。项目目录如：<br> <img src="https://img-blog.csdnimg.cn/f0730763edaf4a07bc7554e089bf09aa.png#pic_center" alt="在这里插入图片描述"></p> 
<h4><a name="t7"></a><a id="_103"></a>第二种方式</h4> 
<ul><li>添加 <strong>deep: false</strong>，关闭深度导入</li></ul> 
<p><strong>deep: true</strong> 时会深度搜索并按需导入组件，设置false时则 只会 导入 dirs 根目录下的组件(只导入一层)，不会深度匹配导入</p> 
<p>此时我们可以搭配 <strong>第一种 组合文件夹的方式</strong>。也可以把 局部组件直接新建到 components 文件夹下，而全局组件则放到 src/components/globalComponents 文件下如：。</p> 
<pre data-index="4" class="set-code-hide prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  // vite.config.ts
  import Components from 'unplugin-vue-components/vite'
  import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
  export default ({ _mode }: ConfigEnv): UserConfig =&gt; {
    return {
      base: './',
      plugins: [
        vue(),
        Components({
          dts: true,
          // 要搜索组件的目录
          dirs: ['src/components'], 
          // 组件有效扩展名
          extensions: ['vue'],
          // 只导入 dirs 指定的根目录组件，不进行深度导入
          deep: false, 
          // 按需自动导入 elementPlus 组件
          resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        })
      ]
    }
  }
<div class="hljs-button {2}" data-title="复制"></div></code><div class="hide-preCode-box"><span class="hide-preCode-bt"><img class="look-more-preCode contentImg-no-view" src="https://csdnimg.cn/release/blogv2/dist/pc/img/newCodeMoreWhite.png" alt="" title=""></span></div><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li></ul></pre> 
<h4><a name="t8"></a><a id="_136"></a>总结</h4> 
<p>通过上面的两种方式，我们就可以有选择的注册全局组件和局部组件了。当然 unplugin-vue-components 还有一些不常用的配置。如: globs</p> 
<p><strong>globs：导入我们指定的文件，设置 globs 后将忽略 dirs 和 extensions 属性的设置</strong>。如：</p> 
<pre data-index="5" class="set-code-hide prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  // vite.config.ts
  import Components from 'unplugin-vue-components/vite'
  export default ({ _mode }: ConfigEnv): UserConfig =&gt; {
    return {
      base: './',
      plugins: [
        vue(),
        Components({
          dts: true,
          // 要搜索组件的目录
          dirs: ['src/components'], // 默认值也是 src/components
          // 组件有效扩展名
          extensions: ['vue'],
          globs: ['src/views/*.{vue}'],
        })
      ]
    }
  }
<div class="hljs-button {2}" data-title="复制"></div></code><div class="hide-preCode-box"><span class="hide-preCode-bt"><img class="look-more-preCode contentImg-no-view" src="https://csdnimg.cn/release/blogv2/dist/pc/img/newCodeMoreWhite.png" alt="" title=""></span></div><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li></ul></pre> 
<p><strong>此配置将忽略 dirs 和 extensions 属性配置，而使用 globs 配置，即：只会按需导入 src/views 文件夹下所有以 .vue 结尾的文件</strong></p> 
<p><strong>如何使用终于讲完了，看到这里如果您走了，那您肯定不是冲着该篇文章的标题来的。我们的重头戏才刚刚开始，下一站原理分析。</strong></p> 
<h3><a name="t9"></a><a id="unpluginvuecomponents__165"></a>unplugin-vue-components 原理分析</h3> 
<h4><a name="t10"></a><a id="_167"></a>示例代码</h4> 
<pre data-index="6" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  // vite.config.ts
  export default ({ _mode }: ConfigEnv): UserConfig =&gt; {
    return {
      plugins: [
        Components({
          dirs: ['src/components/localComponents'], 
          resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        })
      ]
    }
  }
  
  // src/views/test/Index.vue
  &lt;template&gt;
    &lt;div&gt;
      &lt;el-button&gt;ElmentPlus按钮&lt;/el-button&gt;
      &lt;local-test-components&gt;局部按需导入组件&lt;/local-test-components&gt;
      &lt;global-loading-components&gt;全局组件&lt;/global-loading-components&gt;
    &lt;/div&gt;
  &lt;/template&gt;
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li></ul></pre> 
<h4><a name="t11"></a><a id="_191"></a>示例说明</h4> 
<ul><li>在 vite.config.ts 配置文件中设置 dirs 路径，并设置了 ElementPlusResolver 解析器</li><li>在模版中使用了三个组件，一个是 ElementPlus UI库下的 ElButton 组件；一个是 src/components/localComponents 文件夹下的 LocalTestComponents 组件，一个是 src/components/globalComponents 文件夹下的 GlobalLoadingComponents 全局组件</li></ul> 
<p><strong>全局组件我们直接使用，这很好理解。那UI库组件以及局部组件 unplugin-vue-components 是怎么做到按需引入的呢？</strong></p> 
<h4><a name="t12"></a><a id="UI_198"></a>UI组件库</h4> 
<p>unplugin-vue-components 为主流的UI组件库提供了<strong>内置的支持</strong>，如：Element Plus、Ant Design Vue、View UI、Vant等，通过使用对应UI组件库的<strong>解析器</strong>，就会自动引入对应的组件库的<strong>组件和对应样式</strong>。</p> 
<h4><a name="t13"></a><a id="_201"></a>解析器</h4> 
<p>unplugin-vue-components 为主流UI库提供的解析器<strong>大多数都是函数</strong> 如：Element Plus、Ant Design Vue、View UI，但也有例外如：Bootstrap 解析器<strong>就是一个对象</strong>。</p> 
<p>我们以 <strong>ElementPlusResolver 函数解析器</strong>来说明</p> 
<pre data-index="7" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  export function ElementPlusResolver(options){
    return [
      { type: 'component', 
        resolve: (name: string) =&gt; {
          return {
            name, // ElButton
            from, // element-plus/es
            sideEffects // element-plus/es/components/button/style/index
        }
      }},
      { type: 'directive', resolve: (name: string) =&gt; return {...省略}) }
    ]
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li></ul></pre> 
<p>由此可知 ElementPlusResolver 解析器不仅支持 组件 按需导入，同时也支持指令。当是组件时 resolve 函数就会根据name值来返回一个对象如：</p> 
<pre data-index="8" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  {
    name: 'ElButton',
    from: 'element-plus/es',
    sideEffects: 'element-plus/es/components/button/style/index' 
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li></ul></pre> 
<p>此时 unplugin-vue-components 就会根据上面获得的对象来按需引入 ElButton 组件及样式如：</p> 
<pre data-index="9" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  import { ElButton } from 'element-plus/es';
  import 'element-plus/es/components/button/style/index';
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li></ul></pre> 
<p><strong>当然最终都会为 组件 起一个别名再使用，这里我不太理解为什么要使用别名，希望知道的大佬帮解释一下！！！</strong></p> 
<h4><a name="t14"></a><a id="_240"></a>转换流程</h4> 
<p>我们先看下模版转换成 渲染函数 是什么样子？<br> <img src="https://img-blog.csdnimg.cn/48323d917d304d34a3fd569af1cde7b3.png#pic_center" alt="在这里插入图片描述"><br> <strong>由图可知：</strong> 所有组件都会使用 _resolveComponent 包裹，<a href="https://cn.vuejs.org/api/render-function.html#resolvecomponent" rel="nofollow">resolveComponent()&ZeroWidthSpace;</a> 函数的作用就是 <strong>按名称手动解析已注册的组件</strong></p> 
<p>紧接着 unplugin-vue-components 插件开始工作，通过 <strong>transform 钩子函数拿到上面的 渲染函数 代码并进行转换</strong></p> 
<p><img src="https://img-blog.csdnimg.cn/c59e2a91ce504bac92dc00b92ec66f00.png#pic_center" alt="在这里插入图片描述"></p> 
<p><strong>由图可知：</strong> 经过转换后的 渲染函数，已经帮我们按需导入了以下代码</p> 
<pre data-index="10" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  /* unplugin-vue-components disabled */
  import __unplugin_components_1 from '/Users/admin/liuyz/release-project/manage-system-pc/src/components/localComponents/LocalTestComponents.vue';

import { ElButton as \_\_unplugin_components_0 } from 'element-plus/es'
import 'element-plus/es/components/button/style/index'

<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li></ul></pre> 
<p>并将 render 函数中 <strong>_resolveComponent 替换成 _<em>unplugin_components</em>${no}</strong>，从而达到了按需使用组件的功能。</p> 
<h3><a name="t15"></a><a id="unpluginvuecomponents__260"></a>unplugin-vue-components 源码分析</h3> 
<p>我们知道 unplugin-vue-components 是 vite 的一款插件库，我们要将插件添加到项目的 devDependencies 中并使用数组形式的 plugins 选项配置它们。</p> 
<p>通常的惯例是创建一个 Vite/Rollup 插件作为一个返回实际插件对象的工厂函数。该函数可以接受允许用户自定义插件行为的选项(引用)，我想当然的以为 unplugin-vue-components 是 Vite 的专属插件，因为它使用了 Vite 特有的钩子函数，其实不然，unplugin-vue-components 不限制打包工具。</p> 
<p>我们还是拿上面的例子来做分析如：</p> 
<pre data-index="11" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  // vite.config.ts
  export default ({ _mode }: ConfigEnv): UserConfig =&gt; {
    return {
      plugins: [
        Components({
          dirs: ['src/components/localComponents'], 
          resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        })
      ]
    }
  }
  
  // src/views/test/Index.vue
  &lt;template&gt;
    &lt;div&gt;
      &lt;el-button&gt;ElmentPlus按钮&lt;/el-button&gt;
      &lt;local-test-components&gt;局部按需导入组件&lt;/local-test-components&gt;
      &lt;global-loading-components&gt;全局组件&lt;/global-loading-components&gt;
    &lt;/div&gt;
  &lt;/template&gt;
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li></ul></pre> 
<h4><a name="t16"></a><a id="_289"></a>插件入口函数</h4> 
<pre data-index="12" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">
  // src/core/unplugin.ts
  export default createUnplugin&lt;Options&gt;((options = {}) =&gt; {
    // 很重要 生成此插件对象 用于后续 钩子函数使用
    const ctx: Context = new Context(options)

    return {
      name: 'unplugin-vue-components',
      // 该钩子会在每个传入模块请求时被调用 转换 渲染函数
      async transform(code, id) {
        if (!shouldTransform(code))
          return null
        try {
          // 转换 code
          const result = await ctx.transform(code, id)
          // 生成 components.d.ts 文件
          ctx.generateDeclaration()
          return result
        }
        catch (e) {
          this.error(e)
        }
      },

      vite: {
        configResolved(config: ResolvedConfig) {
          ctx.setRoot(config.root)
          ctx.sourcemap = true
          if (ctx.options.dts) {
            ctx.searchGlob()
            // 当 components.d.ts 不存在时重新生成
            if (!existsSync(ctx.options.dts))
              ctx.generateDeclaration()
          }
        },
        configureServer(server: ViteDevServer) {
          // 观察项目所有目录下的变化
          ctx.setupViteServer(server)
        },
      },
    }

})

<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li><li style="color: rgb(153, 153, 153);">23</li><li style="color: rgb(153, 153, 153);">24</li><li style="color: rgb(153, 153, 153);">25</li><li style="color: rgb(153, 153, 153);">26</li><li style="color: rgb(153, 153, 153);">27</li><li style="color: rgb(153, 153, 153);">28</li><li style="color: rgb(153, 153, 153);">29</li><li style="color: rgb(153, 153, 153);">30</li><li style="color: rgb(153, 153, 153);">31</li><li style="color: rgb(153, 153, 153);">32</li><li style="color: rgb(153, 153, 153);">33</li><li style="color: rgb(153, 153, 153);">34</li><li style="color: rgb(153, 153, 153);">35</li><li style="color: rgb(153, 153, 153);">36</li><li style="color: rgb(153, 153, 153);">37</li><li style="color: rgb(153, 153, 153);">38</li><li style="color: rgb(153, 153, 153);">39</li><li style="color: rgb(153, 153, 153);">40</li><li style="color: rgb(153, 153, 153);">41</li><li style="color: rgb(153, 153, 153);">42</li></ul></pre> 
<p>入口函数很简单同时也很重要，一共做了四件事情</p> 
<ul><li>创建 Context 对象，用于后续 钩子函数使用</li><li>调用 transform 钩子对 渲染函数code 进行转换并返回</li><li>调用 configResolved 钩子，用于更新按需导入组件对象信息</li><li>调用 configureServer 钩子，对指定文件夹进行监听如：新增或删除</li></ul> 
<p>下面我们就围绕着这四步来一一分析</p> 
<h4><a name="t17"></a><a id="Context__346"></a>Context 对象</h4> 
<h5><a id="_348"></a>构造函数</h5> 
<pre data-index="13" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  // src/core/context.ts
  constructor( 
    private rawOptions: Options,
  ) { // 构造函数
    this.options = resolveOptions(rawOptions, this.root)
    this.generateDeclaration = throttle(500, this._generateDeclaration.bind(this), { noLeading: false })
    this.setTransformer(this.options.transformer)
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li></ul></pre> 
<h5><a id="thisoptions__360"></a>this.options 对象</h5> 
<pre data-index="14" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  // src/core/options.ts
  export const defaultOptions: Omit&lt;Required&lt;Options&gt;, 'include' | 'exclude' | 'transformer' | 'globs' | 'directives' | 'types' | 'version'&gt; = {  
   //  resolveOptions 函数 默认参数
    dirs: 'src/components',
    extensions: 'vue',
    deep: true,
    dts: isPackageExists('typescript'),
    directoryAsNamespace: false,
    collapseSamePrefixes: false,
    globalNamespaces: [],
    resolvers: [],
    importPathTransform: v =&gt; v,
    allowOverrides: false,
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li></ul></pre> 
<p><strong>resolveOptions 函数最终会返回如下对象</strong></p> 
<pre data-index="15" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;"> {
    dirs: [ 'src/components/localComponents' ],
    extensions: [ 'vue' ],
    deep: true,
    dts: '/Users/admin/liuyz/release-project/manage-system-pc/components.d.ts',
    directoryAsNamespace: false,
    collapseSamePrefixes: false,
    globalNamespaces: [],
    resolvers: [
      { type: 'component', resolve: [AsyncFunction: resolve] },
      { type: 'directive', resolve: [AsyncFunction: resolve] }
    ],
    importPathTransform: [Function: importPathTransform],
    allowOverrides: false,
    types: [],
    resolvedDirs: [
      '/Users/admin/liuyz/release-project/manage-system-pc/src/components/localComponents'
    ],
    globs: [
      '/Users/admin/liuyz/release-project/manage-system-pc/src/components/localComponents/**/*.vue'
    ],
    root: '/Users/admin/liuyz/release-project/manage-system-pc',
    version: 3,
    transformer: 'vue3',
    directives: true
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li><li style="color: rgb(153, 153, 153);">23</li><li style="color: rgb(153, 153, 153);">24</li><li style="color: rgb(153, 153, 153);">25</li><li style="color: rgb(153, 153, 153);">26</li></ul></pre> 
<p>在上面的 resolveOptions 对象中，我们需要记住以下几个重要的信息</p> 
<ul><li>dirs、deep、globs 的值，后续会根据这两个值来深度递归按需导入组件</li><li>dts 的值，后续会根据这个值来创建 components.d.ts 类型文件</li><li>resolvers 的值，后续会根据这个值来转换 ElementPlus 中的组件</li></ul> 
<h5><a id="thisgenerateDeclaration__414"></a>this.generateDeclaration 函数</h5> 
<p>很简单，主要是用来生成 components.d.ts 文件的</p> 
<h5><a id="thissetTransformer__417"></a>this.setTransformer 函数</h5> 
<pre data-index="16" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">setTransformer(name: Options['transformer']) {
  debug.env('transformer', name)
  // 这里我们使用 vue3
  this.transformer = transformer(this, name || 'vue3')
}
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li></ul></pre> 
<pre data-index="17" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">
  // src/core/transformer.ts
  export default function transformer(ctx: Context, transformer: SupportedTransformer): Transformer {
    return async (code, id, path) =&gt; {
      // 搜索指定dirs组件并把信息保存到 _componentNameMap 对象中
      ctx.searchGlob()

      // /Users/admin/liuyz/release-project/manage-system-pc/src/views/test/Index.vue
      const sfcPath = ctx.normalizePath(path)
      debug(sfcPath)

      // 魔法字符串 对字符串进行替换操作
      const s = new MagicString(code)
      // 转换字符串 实现按需导入
      await transformComponent(code, transformer, s, ctx, sfcPath)
      if (ctx.options.directives)
        await transformDirectives(code, transformer, s, ctx, sfcPath)

      s.prepend(DISABLE_COMMENT)

      const result: TransformResult = { code: s.toString() }
      // 返回按需导入的代码
      return result
    }

}

<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li><li style="color: rgb(153, 153, 153);">23</li><li style="color: rgb(153, 153, 153);">24</li><li style="color: rgb(153, 153, 153);">25</li></ul></pre> 
<p><strong>this.setTransformer 函数主要就是给 this.transformer 赋值匿名函数，匿名函数的作用主要是对字符串进行替换实现按需导入，最重要的属于 transformComponent 函数，我们后续再慢慢说，最后返回替换后的 result，供插件的钩子函数 transform 中使用</strong></p> 
<p><strong>此时 Context 对象创建完成，当然此对象内部还有很多方法正在迫不及待的等着调用。接下来代码回调到了 transform 钩子函数。</strong></p> 
<h4><a name="t18"></a><a id="transform__459"></a>transform 钩子函数</h4> 
<pre data-index="18" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">transform(code: string, id: string) {
  const { path, query } = parseId(id)
  return this.transformer(code, id, path, query)
}
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li></ul></pre> 
<p><strong>它们衔接的很好啊。刚在创建的 Context 对象中为 this.transformer 赋了值，在 transform 中马上就调用了，此时我们不得不看看 transformComponent 到底都做了些什么事情了？</strong></p> 
<h5><a id="transformComponent__470"></a>transformComponent 函数</h5> 
<pre data-index="19" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  src/core/transforms/component.ts
  const resolveVue3 = (code: string, s: MagicString) =&gt; {
    const results: ResolveResult[] = []
    for (const match of code.matchAll(/_resolveComponent[0-9]*\("(.+?)"\)/g)) {
      const matchedName = match[1]
      if (match.index != null &amp;&amp; matchedName &amp;&amp; !matchedName.startsWith('_')) {
        const start = match.index
        const end = start + match[0].length
        results.push({
          rawName: matchedName,
          // 提供替换的方法
          replace: resolved =&gt; s.overwrite(start, end, resolved),
        })
      }
    }
    return results
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li></ul></pre> 
<pre data-index="20" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">
  src/core/transforms/component.ts
  export default async function transformComponent(code: string, transformer: SupportedTransformer, s: MagicString, ctx: Context, sfcPath: string) {
    let no = 0
    // 这里是vue3项目，因此使用 resolveVue3
    const results = transformer === 'vue2' ? resolveVue2(code, s) : resolveVue3(code, s)

    for (const { rawName, replace } of results) {
      debug(`| ${rawName}`)
      // 变成大驼峰命名 如 el-button -&gt; ElButton
      const name = pascalCase(rawName)
      ctx.updateUsageMap(sfcPath, [name])
      // 从本地或指定解析器(如: ElementPlus)中寻找组件
      const component = await ctx.findComponent(name, 'component', [sfcPath])
      if (component) {
        const varName = `__unplugin_components_${no}`
        // 替换
        s.prepend(`${stringifyComponentImport({ ...component, as: varName }, ctx)};\n`)
        no += 1
        // 替换
        replace(varName)
      }
    }

}

<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li><li style="color: rgb(153, 153, 153);">23</li><li style="color: rgb(153, 153, 153);">24</li><li style="color: rgb(153, 153, 153);">25</li></ul></pre> 
<p><strong>transformComponent 函数的主要作用就是用 { …component, as: varName } 和 _<em>unplugin_components</em>${ no } 替换需要按需导入的组件。</strong></p> 
<p>一共分四个步骤</p> 
<ol><li>通过 <strong>resolveVue3</strong> 函数对 渲染函数code 进行正则匹配处理得到 results 值，并为每一个对象提供 replace 替换函数。results值为：</li></ol> 
<pre data-index="21" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  [
    { rawName: 'el-button', replace: (resolved) =&gt; s.overwrite(start, end, resolved) },
    { rawName: 'local-test-components', replace: (resolved) =&gt; s.overwrite(start, end, resolved) },
    { rawName: 'global-loading-components', replace: (resolved) =&gt; s.overwrite(start, end, resolved) }
  ]
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li></ul></pre> 
<ol start="2"><li>通过 findComponent 函数对组件 results 中每个组件进行查找，找到则进行替换，否在什么都不处理</li></ol> 
<p><strong>当找到 src/components/localComponents 下组件时返回的 component 对象为</strong></p> 
<pre data-index="22" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  {
    as: 'LocalTestComponents',
    from: '/Users/admin/liuyz/release-project/manage-system-pc/src/components/localComponents/LocalTestComponents.vue'
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li></ul></pre> 
<p><strong>当找到 ElementPlus 下组件时返回的 component 对象为</strong></p> 
<pre data-index="23" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  {
    as: 'ElButton',
    name: 'ElButton',
    from: 'element-plus/es',
    sideEffects: 'element-plus/es/components/button/style/index' 
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li></ul></pre> 
<ol start="3"><li>在 s.prepend 添加代码<br> 作用是给渲染函数按需导入指定组件</li></ol> 
<p><strong>当是 src/components/localComponents 组件时会添加</strong></p> 
<pre data-index="24" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">	import __unplugin_components_1 from '/Users/admin/liuyz/release-project/manage-system-pc/src/components/localComponents/LocalTestComponents.vue';
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li></ul></pre> 
<p><strong>当是 ElementPlus 组件时会添加</strong></p> 
<pre data-index="25" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">	import { ElButton as __unplugin_components_0 } from 'element-plus/es';
	import 'element-plus/es/components/button/style/index';
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li></ul></pre> 
<p><strong>可以看到 把 ElButton as __unplugin_components_0，同时也引入了 button 的样式文件</strong></p> 
<ol start="4"><li>replace 替换</li></ol> 
<p><strong>当是 src/components/localComponents 组件时会添加</strong><br> 把 _resolveComponent(“local-test-components”) 替换为 __unplugin_components_1</p> 
<p><strong>当是 ElementPlus 组件时会添加</strong><br> 把 _resolveComponent(“el-button”) 替换为 __unplugin_components_0</p> 
<p><strong>当是全局组件时或者说找到该组件时则什么都不做</strong></p> 
<pre data-index="26" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">	//还是原来代码
	_resolveComponent("global-loading-components")
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li></ul></pre> 
<h5><a id="findComponent____586"></a>findComponent 函数 - 查找组件</h5> 
<pre data-index="27" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  async findComponent(name: string, type: 'component' | 'directive', excludePaths: string[] = []): Promise&lt;ComponentInfo | undefined&gt; {
    // _componentNameMap 存放所有本地 dirs 目录下的组件的信息 
    let info = this._componentNameMap[name]
    if (info &amp;&amp; !excludePaths.includes(info.from) &amp;&amp; !excludePaths.includes(info.from.slice(1)))
      return info

    // 这里每次都会处理第三方UI库的组件
    for (const resolver of this.options.resolvers) {
      // 判断是否存在类型 如：全局组件不存在类型则执行下次循环，而ElementPlus组件存在类型则继续向下执行
      if (resolver.type !== type)
        continue
      // 一般用于调用第三方UI库解析器
      const result = await resolver.resolve(type === 'directive' ? name.slice(DIRECTIVE_IMPORT_PREFIX.length) : name)
      if (!result)
        continue

      if (typeof result === 'string') {
        info = {
          as: name,
          from: result,
        }
      }
      else {
        info = {
          as: name,
          ...normalizeComponetInfo(result),
        }
      }
      if (type === 'component')
        // 添加UI库组件信息 用于写入 components.d.ts 中
        this.addCustomComponents(info)
      else if (type === 'directive')
        this.addCustomDirectives(info)
      return info
    }

    return undefined

}

<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li><li style="color: rgb(153, 153, 153);">23</li><li style="color: rgb(153, 153, 153);">24</li><li style="color: rgb(153, 153, 153);">25</li><li style="color: rgb(153, 153, 153);">26</li><li style="color: rgb(153, 153, 153);">27</li><li style="color: rgb(153, 153, 153);">28</li><li style="color: rgb(153, 153, 153);">29</li><li style="color: rgb(153, 153, 153);">30</li><li style="color: rgb(153, 153, 153);">31</li><li style="color: rgb(153, 153, 153);">32</li><li style="color: rgb(153, 153, 153);">33</li><li style="color: rgb(153, 153, 153);">34</li><li style="color: rgb(153, 153, 153);">35</li><li style="color: rgb(153, 153, 153);">36</li><li style="color: rgb(153, 153, 153);">37</li><li style="color: rgb(153, 153, 153);">38</li></ul></pre> 
<p>该函数的主要作用就是查找组件</p> 
<ul><li>通过 _componentNameMap 查找该组件是否属于 本地组件。_componentNameMap 对象中只存放本地组件信息如：</li></ul> 
<pre data-index="28" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">{
  LocalTestComponents: {
    as: 'LocalTestComponents',
    from: '/Users/admin/liuyz/release-project/manage-system-pc/src/components/localComponents/LocalTestComponents.vue'
  }
}
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li></ul></pre> 
<ul><li>非指定 src/components/localComponents 下的组件则会通过指定的解析器继续查找，像 ElButton 组件是肯定可以查到，但像全部组件或着src/views下的组件肯定查找不到，所以会返回 undefined</li><li>把查找到的UI组件添加 _componentCustomMap 对象中，用于写入 components.d.ts 中</li></ul> 
<p><strong>看到这里您是否有一个疑问？ 在 findComponent 函数中 _componentNameMap 本地组件对象是什么时候赋的值呢？</strong></p> 
<p><strong>回答</strong><br> <strong>其实在 src / core / transformer.ts 文件的 transformer 返回的函数中通过 ctx.searchGlob() 赋值的。我们现在来具体看看它是怎么实现的！</strong></p> 
<h5><a id="searchGlobsearchComponentsaddComponents__650"></a>searchGlob/searchComponents/addComponents 函数</h5> 
<pre data-index="29" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  // src/core/context.ts
  searchGlob() {
    // 只会执行一次
    if (this._searched)
      return
    // 搜索组件
    searchComponents(this)
    this._searched = true
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li></ul></pre> 
<pre data-index="30" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  // src/core/fs/glob.ts
  export function searchComponents(ctx: Context) {
    const root = ctx.root
    //globs： ['/Users/admin/liuyz/release-project/manage-system-pc/src/components/localComponents/**/*.vue']
    const files = fg.sync(ctx.options.globs, {
      ignore: ['node_modules'],
      onlyFiles: true,
      cwd: root,
      absolute: true,
    })
    ctx.addComponents(files)
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li></ul></pre> 
<pre data-index="31" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;"> // 添加组件
  addComponents(paths: string | string[]) {
    const size = this._componentPaths.size
    toArray(paths).forEach(p =&gt; this._componentPaths.add(p))
    if (this._componentPaths.size !== size) {
      this.updateComponentNameMap()
      return true
    }
    return false
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li></ul></pre> 
<p>这里是从 globs 目录下搜索所有以.vue 结尾的文件并保存到 _componentPaths 的Set对象中，此时 _componentPaths 为</p> 
<pre data-index="32" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">{
  '/Users/admin/liuyz/release-project/manage-system-pc/src/components/localComponents/LocalTestComponents.vue'
}
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li></ul></pre> 
<h5><a id="updateComponentNameMap___componentNameMap__699"></a>updateComponentNameMap 函数-更新 _componentNameMap 值用于查询组件</h5> 
<pre data-index="33" class="set-code-hide prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;"> private updateComponentNameMap() {
    this._componentNameMap = {}
    Array
      .from(this._componentPaths)
      .forEach((path) =&gt; {
        const name = pascalCase(getNameFromFilePath(path, this.options))
        if (this._componentNameMap[name] &amp;&amp; !this.options.allowOverrides) {
          console.warn(`[unplugin-vue-components] component "${name}"(${path}) has naming conflicts with other components, ignored.`)
          return
        }

        this._componentNameMap[name] = {
          as: name,
          from: path,
        }
      })

}

<div class="hljs-button {2}" data-title="复制"></div></code><div class="hide-preCode-box"><span class="hide-preCode-bt"><img class="look-more-preCode contentImg-no-view" src="https://csdnimg.cn/release/blogv2/dist/pc/img/newCodeMoreWhite.png" alt="" title=""></span></div><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li></ul></pre> 
<p>该函数只会把本地组件信息存放到 _componentNameMap 对象中，如：</p> 
<pre data-index="34" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  {
    as: 'LocalTestComponents',
    from: '/Users/admin/liuyz/release-project/manage-system-pc/src/components/localComponents/LocalTestComponents.vue'
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li></ul></pre> 
<p><strong>总结</strong></p> 
<ol><li>transform 钩子函数执行先查找保存本地指定的组件信息，再通过解析器查找第三方组件信息</li><li>查找到后通过 MagicString 魔法字符串库进行追加和替换</li><li>创建并更新 components.d.ts 类型声明文件</li></ol> 
<h4><a name="t19"></a><a id="configResolved__735"></a>configResolved 钩子</h4> 
<ul><li>用于更新按需导入组件对象信息</li><li>检查 components.d.ts 文件是否存在</li></ul> 
<h4><a name="t20"></a><a id="configureServer__740"></a>configureServer 钩子</h4> 
<pre data-index="35" class="prettyprint set-code-show"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  setupWatcher(watcher: fs.FSWatcher) {
    const { globs } = this.options

    // 删除文件时触发
    watcher
      .on('unlink', (path) =&gt; {
        if (!matchGlobs(path, globs))
          return
        path = slash(path)
        this.removeComponents(path)
        this.onUpdate(path)
      })

    // 添加文件时触发
    watcher
      .on('add', (path) =&gt; {
        if (!matchGlobs(path, globs))
          return
        path = slash(path)
        this.addComponents(path)
        this.onUpdate(path)
      })

}

<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li><li style="color: rgb(153, 153, 153);">23</li></ul></pre> 
<p><strong>这里主要对本项目 文件任何变动 进行监听。当然我们只需要对 dirs 目录下的文件进行一些处理，所以会通过 matchGlobs 进行拦截，当条件满足时才会又通过 addComponents/removeComponents 对 _componentNameMap 对象进行更新</strong></p> 
<p>主线逻辑终于分析完了，<strong>看到这里您应该也累了，但先别下车</strong>， ElementPlusResolver 解析器又突上眉头，我们再坚持坚持，争取一鼓作气把它看完</p> 
<h3><a name="t21"></a><a id="ElementPlusResolver__773"></a>ElementPlusResolver 解析器</h3> 
<pre data-index="36" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  resolvers: [ ElementPlusResolver({importStyle: 'sass'})]
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li></ul></pre> 
<pre data-index="37" class="set-code-hide prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  // src/core/resolvers/element-plus.ts
  export function ElementPlusResolver(
    options: ElementPlusResolverOptions = {},
  ): ComponentResolver[] {
    let optionsResolved: ElementPlusResolverOptionsResolved

    // 拿到合并后的 optionsResolved 参数
    async function resolveOptions() {
      if (optionsResolved)
        return optionsResolved
      optionsResolved = {
        ssr: false,
        version: await getPkgVersion('element-plus', '2.2.2'),
        importStyle: 'css',
        directives: true,
        exclude: undefined,
        noStylesComponents: options.noStylesComponents || [],
        ...options,
      }
      return optionsResolved
    }

    return [
      {
        type: 'component',
        resolve: async (name: string) =&gt; {
          const options = await resolveOptions()
          if ([...options.noStylesComponents, ...noStylesComponents].includes(name))
            return resolveComponent(name, { ...options, importStyle: false })
          else return resolveComponent(name, options) // 一般都这里
        },
      },
      {
        type: 'directive',
        resolve: async (name: string) =&gt; {
          return resolveDirective(name, await resolveOptions())
        },
      },
    ]

}

<div class="hljs-button {2}" data-title="复制"></div></code><div class="hide-preCode-box"><span class="hide-preCode-bt"><img class="look-more-preCode contentImg-no-view" src="https://csdnimg.cn/release/blogv2/dist/pc/img/newCodeMoreWhite.png" alt="" title=""></span></div><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li><li style="color: rgb(153, 153, 153);">15</li><li style="color: rgb(153, 153, 153);">16</li><li style="color: rgb(153, 153, 153);">17</li><li style="color: rgb(153, 153, 153);">18</li><li style="color: rgb(153, 153, 153);">19</li><li style="color: rgb(153, 153, 153);">20</li><li style="color: rgb(153, 153, 153);">21</li><li style="color: rgb(153, 153, 153);">22</li><li style="color: rgb(153, 153, 153);">23</li><li style="color: rgb(153, 153, 153);">24</li><li style="color: rgb(153, 153, 153);">25</li><li style="color: rgb(153, 153, 153);">26</li><li style="color: rgb(153, 153, 153);">27</li><li style="color: rgb(153, 153, 153);">28</li><li style="color: rgb(153, 153, 153);">29</li><li style="color: rgb(153, 153, 153);">30</li><li style="color: rgb(153, 153, 153);">31</li><li style="color: rgb(153, 153, 153);">32</li><li style="color: rgb(153, 153, 153);">33</li><li style="color: rgb(153, 153, 153);">34</li><li style="color: rgb(153, 153, 153);">35</li><li style="color: rgb(153, 153, 153);">36</li><li style="color: rgb(153, 153, 153);">37</li><li style="color: rgb(153, 153, 153);">38</li><li style="color: rgb(153, 153, 153);">39</li><li style="color: rgb(153, 153, 153);">40</li></ul></pre> 
<p>我们发现 ElementPlusResolver 是一个函数，执行后返回</p> 
<pre data-index="38" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  [
    { type: 'component', resolve: (name: string) =&gt; resolveComponent(name, options) },
    { type: 'directive', resolve: (name: string) =&gt; resolveDirective(name, await resolveOptions()) }
  ]
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li></ul></pre> 
<p>这正好和我们上面对应上了, 这里我把[AsyncFunction: resolve]替换成了箭头函数。这里为每一个类型提供了 resolve 函数，而这里 resolveComponent 函数就会返回<strong>组件的名称、组件文件路径、组件样式路径</strong></p> 
<pre data-index="39" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  {
    name: 'ElButton',
    from: 'element-plus/es',
    sideEffects: 'element-plus/es/components/button/style/index'
  }
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li></ul></pre> 
<p>这个时候您可能需要再看下 findComponent 函数中这行代码了</p> 
<pre data-index="40" class="set-code-show prettyprint"><code class="has-numbering" onclick="mdcp.copyCode(event)" style="position: unset;">  const result = await resolver.resolve(type === 'directive' ? name.slice(DIRECTIVE_IMPORT_PREFIX.length) : name)
<div class="hljs-button {2}" data-title="复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li></ul></pre> 
<p>这里 result 的结果就 resolveComponent 函数返回的结果</p> 
<h3><a name="t22"></a><a id="_846"></a>总结</h3> 
<p><strong>unplugin-vue-components 通过对原始 渲染函数 进行加工转换，实现按需自动导入组件的功能。从而减小项目包体积，加快页面加载速度，进而提升用户体验。</strong></p> 
<p>好了到站了！终于可以下车了！希望这篇文章对您有所收获。</p>
                </div>
