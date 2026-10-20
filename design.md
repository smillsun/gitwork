# FORTUNE 管理系统设计规范（Design System）

> 本文档从「采购执行平台」单文件系统（`index.html`）中提炼，供其他系统复用整套视觉与交互样式。
> 基准：Ant Design v5/v6 设计令牌 · 紧凑密度（Compact）· 桌面端优先（最小支持 1280px，横向滚动兜底）。
> 所有颜色、圆角、阴影均通过 CSS 变量（`--*`）引用，换主题只需覆盖 `:root` 一层。

---

## 1. 设计原则

1. **紧凑高密度**：基准字号 12px、控件高度 28px、行高 32px，一屏尽量多信息。
2. **单行不换行**：全局 `white-space:nowrap`，超长文本省略号 + `title` 悬停看全文，页面横向滚动兜底。
3. **8px 间距节奏**：卡片间距、区块间距默认 8px；统计指标卡之间例外 16px。
4. **语义色三件套**：每个语义色（成功/警告/错误/主色）都有 `背景 / 边框 / 文字` 三个衍生变量，Tag 一律「浅底+色边+深字」。
5. **颜色 + 形状双通道编码**：状态 Tag 除颜色外附加形状（圆/方/菱），色弱可辨（WCAG 1.4.1）。
6. **数据同源**：统计卡数值必须与表格数据同源，支持点击下钻筛选，禁止"卡片 27 条、点开 4 条"。

---

## 2. Design Tokens（直接复制 `:root` 即可复用）

```css
:root{
  /* 品牌主色（蓝） */
  --primary:#1677ff;  --primary-hover:#4096ff;  --primary-active:#0958d9;
  --primary-bg:#e6f4ff;  --primary-border:#91caff;  --primary-text:#0958d9;

  /* 功能色（各含 bg/border/text 三衍生） */
  --success:#52c41a;  --success-bg:#f6ffed;  --success-border:#b7eb8f;  --success-text:#389e0d;
  --warning:#faad14;  --warning-bg:#fffbe6;  --warning-border:#ffe58f;  --warning-text:#d48806;
  --error:#ff4d4f;    --error-bg:#fff2f0;    --error-border:#ffccc7;    --error-text:#cf1322;

  /* 表面 / 文字 */
  --surface:#ffffff;          /* 卡片、弹层底 */
  --surface-container:#fafafa;/* 表头、次级底 */
  --surface-layout:#f5f5f5;   /* 页面底 */
  --on-surface:#1f1f1f;       /* 主文字 */
  --on-variant:#595959;       /* 次级文字 */
  --on-quaternary:rgba(0,0,0,.45); /* 辅助/占位文字 */
  --disabled:#bfbfbf;

  /* 描边 */
  --outline:#d9d9d9;          /* 控件边框 */
  --outline-variant:#f0f0f0;  /* 分隔线、卡片边 */

  /* 圆角 */
  --r-sm:2px; --r-md:4px; --r:6px; --r-lg:8px; --r-xl:16px; --full:9999px;

  /* 阴影 */
  --shadow-card:0 1px 2px 0 rgba(0,0,0,.03),0 1px 6px -1px rgba(0,0,0,.02),0 2px 4px 0 rgba(0,0,0,.02);
  --shadow-pop:0 6px 16px 0 rgba(0,0,0,.08),0 3px 6px -4px rgba(0,0,0,.12),0 9px 28px 8px rgba(0,0,0,.05);

  /* 控件 */
  --control-h:28px;
  --font:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,
         'Noto Sans','PingFang SC','Hiragino Sans GB','Microsoft YaHei UI','Microsoft YaHei',
         'Source Han Sans SC',sans-serif;
  --mono:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,Courier,monospace;
}
```

### 扩展调色板（统计卡 / 特殊 Tag 用）

| 用途 | 主色 | 浅底 | 用法 |
|---|---|---|---|
| 绿（成功/完成） | `#389e0d` | `#f6ffed` | `.stat-g` |
| 紫（评审/特色） | `#722ed1` | `#f9f0ff` | `.stat-p`（tag 文字 `#531dab`，边 `#d3adf7`） |
| 蓝（主色系） | `#0958d9` | `#e6f4ff` | `.stat-b` |
| 红（异常/驳回） | `#cf1322` | `#fff2f0` | `.stat-r` |
| 橙（预警/催办） | `#d46b08` | `#fff7e6` | `.stat-o`（tag 文字 `#d4380d`，边 `#ffd591`） |
| 青（签字类） | `#08979c` | `#e6fffb`（边 `#87e8de`） | `.tag-cy` |

---

## 3. 字体与排版

| 层级 | 规格 |
|---|---|
| 页面基准 | `12px / line-height 18px`，字重仅 400 / 700 两档 |
| 卡片标题 / 弹窗标题 | `13px` / `14px`，700 |
| Logo 主文字 | `14px 700`，白色，字距 `.5px`；副标题 `10px`，字距 `1.5px` |
| 统计卡大数值 | `22px 700`，`font-variant-numeric:tabular-nums`，字距 `-.5px` |
| 辅助文字 / hint | `11px`，`--on-quaternary` |
| 单据编号 / 时间戳 / 文件名 | `--mono 11px`（等宽字体，便于对齐） |

数字一律加 `font-variant-numeric:tabular-nums` 保证纵向对齐。

---

## 4. 全局基础

```css
*{margin:0;padding:0;box-sizing:border-box}
body,body *{white-space:nowrap}                       /* 全局单行 */
body{background:var(--surface-layout);color:var(--on-surface);
     font-family:var(--font);font-size:12px;line-height:18px;
     -webkit-font-smoothing:antialiased;overflow-x:auto}
button{cursor:pointer;border:none;background:none;transition:all .1s}
```

**无障碍约定**：所有可交互元素 `:focus-visible{outline:2px solid var(--primary);outline-offset:2px}`；
`@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}`。

---

## 5. 页面骨架

```
┌──────────────────────────────────────────────┐
│ 顶部导航 .header（h52，蓝渐变，sticky）          │
├──────────────────────────────────────────────┤
│ 页签条 .pagetabs（h38，白底，多页签可关闭）        │
├──────────────────────────────────────────────┤
│ 内容区 .content（padding 8px，max-width 1680 居中）│
│   ① 查询卡 .card.filter                        │
│   ② 统计指标区 .stats（6 列栅格，gap 16）        │
│   ③ 表格卡 .card.tablecard（标题/页签 + 筛选条 +  │
│      表格 + 分页）                              │
│   ④ footer                                    │
└──────────────────────────────────────────────┘
```

- **列表页顺序固定**：查询区 → 统计区 → 列表区。列表页默认必须带统计指标。
- 卡片：白底、`--r-lg` 圆角、`--shadow-card`、1px `--outline-variant` 边；相邻卡片 `margin-top:8px`。
- 顶部导航：`linear-gradient(90deg,#0958d9,#1677ff)`，高 52px，`position:sticky;top:0`；
  导航项高 32px，白字透明度 `.82`，hover 白底 `.14`，active 白底 `.2` + 700 字重。

---

## 6. 核心组件规范

### 6.1 按钮

统一高度 `--control-h(28px)`、圆角 `--r(6px)`、`padding:0 12px`、字号 12px、`transition:all .1s`。

| 变体 | 样式 |
|---|---|
| `.btn-primary` | 蓝底白字；hover `--primary-hover`；active `--primary-active` |
| `.btn-default` | 白底 + `--outline` 边；hover 文字/边变 `--primary-hover` |
| `.btn-dashed` | 白底 + 虚线边（上传/添加类动作）；hover 同 default |
| `.btn-text` | 透明底蓝字；hover 淡黑底 `rgba(0,0,0,.04)` |
| `.btn-link` | 无边框蓝字链接式；hover `--primary-hover` |
| `.btn-sm` | h22 / padding 0 6px / 11px 字 / 圆角 `--r-md`（表格内按钮） |
| `[disabled]` | 底 `rgba(0,0,0,.04)` + `--disabled` 字 + `cursor:not-allowed` |

表格操作列：用 `.btn-link` 文字按钮，多个操作以 `·` 或间距分隔；列宽 110~130px，右固定。

### 6.2 输入框 / 下拉

- 高 28px、圆角 6px、边 `--outline`、宽默认 190px、`padding:0 8px`。
- hover 边变主色；focus 边主色 + `box-shadow:0 0 0 2px rgba(22,119,255,.1)`。
- placeholder 色 `--disabled`。
- Select：`appearance:none` + 右侧内嵌 SVG 箭头（data URI），右内边距 28px。
- 搜索框：左内嵌放大镜 SVG，`padding-left:26px`，宽 210px。
- readonly：底 `--surface-container`、字 `--on-quaternary`、`cursor:not-allowed`。

### 6.3 统计指标卡（`.stat`）

6 列栅格 `repeat(6,minmax(0,1fr))`，gap 16px。结构：

```
┌─────────────────────────┐
│ ▍标题(12px 700)   [图标] │  ← 左侧 3px 色条（::before，--c）
│ 22 (单位)        ▁▃▂▅    │  ← 大数值 + 迷你柱状条（.stat-bars）
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │  ← 虚线分隔
│ 脚注：占比/均值/口径提示   │  ← 11px
└─────────────────────────┘
```

- padding `8px 10px 8px 14px`；左色条 3px、上下留 8px。
- 配色通过类注入局部变量：`.stat-g/p/b/r/o` → `--c`（主色）`--cbg`（浅底）`--ring`（选中光环，`rgba(c,.18)`）。
- **可下钻卡**：`cursor:pointer`，hover 上浮 1px + 阴影；选中态 `.on`：`--cbg` 底 + 2px `--ring` 光环 + 内嵌「筛选中 ✕」pill（点击 ✕ 取消）。
- **聚合卡**（不可点）：加 `.ro`，右上角自动显示「汇总」角标，无 hover 效果。
- 数值旁可带 `.stat-sub`（12px 400 灰色单位）。
- 下钻联动：点击 → 表格行过滤 + 命中行高亮 + 表格上方筛选条 + 分页合计同步。

### 6.4 表格

密度：`th padding:8px 10px`，`td padding:7px 10px`（行高约 32px），表头 `--surface-container` 底 + 700 字重 + `sticky;top:0`。

- 行 hover：`--surface-container`；行尾无下边线。
- **紧凑宽表**：`table.tbl-fixed{table-layout:fixed}`，单元格 `overflow:hidden`，内容用 `.ell` 省略 + `title` 悬停全文；列宽逐列指定 `min-width`。
- **固定列**：标识列 `.sticky-l`（左固定）、操作列 `.sticky-r`（右固定），`position:sticky` + 白底，表头 z-index 3；固定列靠内容一侧有 6px 渐变分隔阴影。
- **命中行**（下钻/筛选）：`tr.hit` → 底 `#e6f4ff` + 首列左内嵌 3px 主色条；hover 加深为 `#d8ecff`。
- 状态列：Tag（见 6.5）；日期徽标 `.dday`（见 6.7）；进度条 `.prog`（64×4px 圆角条）。

### 6.5 状态 Tag

高 20px、`padding:0 6px`、圆角 4px、11px 字、「浅底 + 色边 + 深字」三段式：

| 类 | 底 / 边 / 字 | 语义示例 |
|---|---|---|
| `.tag`（默认） | 灰系 | 草稿、待通知 |
| `.tag-blue` | `#e6f4ff` / `#91caff` / `#0958d9` | 进行中、评审中 |
| `.tag-green` | `#f6ffed` / `#b7eb8f` / `#389e0d` | 已提交、已通过 |
| `.tag-gold` | `#fffbe6` / `#ffe58f` / `#d48806` | 待升版、待办 |
| `.tag-red` | `#fff2f0` / `#ffccc7` / `#cf1322` | 未提交、已驳回、逾期 |
| `.tag-p` | `#f9f0ff` / `#d3adf7` / `#531dab` | 在线评审 |
| `.tag-cy` | `#e6fffb` / `#87e8de` / `#08979c` | 在线签字 |

**形状编码**（`.tag-dot` 6px 圆点，色弱可辨）：
圆（50%）= 进行中 · 方（1px 圆角）= 待办 · 菱（5px 旋转 45°）= 异常 · 大圆（7px）= 完成。

### 6.6 弹窗（Modal）

- 遮罩 `.mask`：`rgba(0,0,0,.45)`，`z-index:200`，顶部留 60px，内容可滚动。
- 弹窗 `.modal`：宽 680px（表单类）/ 600~620px（通知类），`--r-lg` 圆角，`box-shadow:0 12px 40px rgba(0,0,0,.2)`，入场动画 `mpop .15s`（translateY(-8px)→0，**不用 opacity**，避免 headless 截图冻结）。
- 结构：`.m-head`（12px 16px 内边距，14px 700 标题，右关闭 ✕）→ `.m-body`（16px 内边距，**两列栅格** `1fr 1fr`，gap 12×16）→ `.m-foot`（右对齐按钮，默认「取消 + 主按钮」）。
- 表单字段 `.m-fi`：label 12px 700 + 控件 + `.hint`(11px 灰)；`.wide` 占满整行；必填红星 `i.req{color:var(--error)}`。
- 关闭方式：右上 ✕ / Esc / 点击遮罩空白处。
- 邮件预览块 `.mail-prev`：`--surface-container` 底 + 边框，`pre-wrap` 保留换行，max-height 220px 可滚。
- 附件上传：虚线按钮 `.mail-up-btn` + 文件列表 `.mail-up-i`（文件名省略 + 等宽字号 + ✕ 删除，✕ hover 变红）；单个附件 ≤50M，超限 toast 拒绝。

### 6.7 右侧抽屉（Drawer）

- 容器 fixed 全屏 + 遮罩 `rgba(0,0,0,.3)`，面板右侧滑入 620px（max 94vw），动画 `dIn .2s`（仅 `translateX(48px)→0`，**不含 opacity**）。
- 结构：`.d-head`（标题等宽字体 + 操作按钮）→ `.d-tabs`（页签：选中态蓝底蓝边 700）→ `.d-body`（滚动区，padding 14px）。
- 内容件：
  - 折叠分组标题 `.d-sec`（▾ 箭头可旋转）；
  - 字段栅格 `.d-grid`（4 列 `120px 1fr 130px 1fr`，label 格灰底）；
  - 时间线 `.d-log`（左侧 7px 圆点 + 竖线，时间 11px 等宽灰，内容 12px）；
  - 内嵌文件表 `.vd-filetbl`（文件名纯文本，不绑定点击弹层）。

### 6.8 浮层 / 悬浮操作（Hover Popup）

提交文件等元素悬浮显示「预览 / 下载」小浮层：

- **挂载在 `body` 直下，`position:fixed`**（不可挂在 `td` 内——会被 `overflow:hidden` 裁剪）。
- 样式：白底、边框、圆角 4px、`box-shadow:0 8px 22px rgba(0,0,0,.14)`、`z-index:3000`、padding 3px。
- 按钮 `.fv-btn`：h26、蓝字、透明底；hover `--primary-bg`。
- 延迟 200ms 出现/消失（`__fvTimer`），定位默认在元素右侧，空间不足翻左侧，纵向不出屏。
- 行点击与浮层按钮冲突时，行点击 handler 需排除 `a,button,.file-link`。

### 6.9 筛选条（下钻联动）

表格上方出现：`--surface-container` 底 + 下边线；条件 pill `.fbar-tag`（蓝底蓝边 700 + ✕ 可删）+「共 N 条」计数 + 右侧「清除筛选」下划线链接。删除全部 pill 或点清除即恢复。

### 6.10 其他组件速查

| 组件 | 规格要点 |
|---|---|
| 分页 | 右对齐；「共 N 条」在左；页码按钮 h28；跳页输入框宽 48 |
| Checkbox `.cb` | 14×14、圆角 2px；选中蓝底白勾（伪元素画 ✓） |
| 下拉菜单 `.nav-menu` | 白底、`--r-lg`、`--shadow-pop`、padding 4px；菜单项 h30，hover `--primary-bg` 蓝字 |
| 空状态 `.empty-mini` | 居中，36px 圆形图标底 + 12px 主文案 + 11px 副文案；页面级 `.empty` 用 44px 主色浅底图标 |
| 进度条 `.prog` | 条 64×4px 圆角，底 `#f0f0f0`；完成绿 `--success`、进行中主色、零进度 `--outline`；右侧 11px 数字 |
| 日期徽标 `.dday` | h18、11px；逾期红底 / 今日橙底(`#fff2e8/#d4380d`) / 将至黄底 / 正常灰字 |
| 描述表 `.dl` | 3 列栅格；label 格 110px 灰底右邻边线；值格省略 |
| 链接 `.file-link/.link` | 主色 + hover 下划线（`text-underline-offset:2px`）；编号类用等宽字体 |
| Toast | 顶部居中深色浮层，标题 13px 700 + 副文 12px，3s 自动消失；信息提示用 `toastInfo`（蓝调） |
| 头像 `.avatar` | 24px 圆形（表内 18px），半透明白底白字，取姓名首字 |

---

## 7. 页面级交互约定（复用时必须遵守）

1. **列表页 = 查询卡 + 统计指标区 + 表格卡**；新建列表页若无统计，默认补 6 张统计卡。
2. 统计卡**必须可下钻**（聚合卡需显式标 `.ro`），口径与表格同源；下钻后出现筛选条、行高亮、分页合计同步。
3. 状态体系使用「Tag + 形状」双通道；状态机闭环（如：待通知→未提交→评审中→已通过/已驳回，驳回可回流）。
4. 编号规则：等宽字体展示，格式 `{前缀}-{项目/日期}-{流水}`，如 `TIR-AQ-P26027-001`、`REV-20261020-001`。
5. 脱敏（前后各留 1 字）：公司/供应商/项目编号/项目名称等敏感字符串**前后各保留 1 个可读字符，中间全部用「*」替代**（长度不变），如 `F*****E`、`D*******9`、`杭*********份`；人名单独规则只保留姓氏（宋波→宋*）；**源码中的字面量同步落码**，公开页面查看源码也不泄露；邮箱由脱敏名派生演示域。
6. 弹层动画**只用 transform，不用 opacity**（headless 截图/自动化兼容）。
7. 危险操作（驳回/删除）按钮用橙/红系警示样式，且需二次确认弹层。
8. 时间显示：列表内日期去时分秒；时间线/日志保留完整时间戳（等宽字体）。

---

## 8. 快速接入

最小接入步骤：

1. 复制第 2 节 `:root` 变量块 + 第 4 节全局基础样式。
2. 按需复制第 6 节对应组件 CSS（类名即文档中的 `.btn/.input/.stat/.tag/...`）。
3. 页面骨架按第 5 节顺序搭建：`.header → .pagetabs → .content(.filter + .stats + .tablecard)`。
4. 换品牌色：只覆盖 `--primary` 系列 6 个变量 + 统计卡 `.stat-b` 的 `--c/--cbg/--ring`。

> 附：完整实现参考 `project-admin/index.html`（单文件零依赖，全部样式内联于 `<style>`，可直接检索类名复制）。
