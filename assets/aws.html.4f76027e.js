import{_ as a,o as s,c as n,d as e}from"./app.c570db55.js";const i={},l=e(`<h1 id="aws" tabindex="-1"><a class="header-anchor" href="#aws" aria-hidden="true">#</a> aws</h1><h2 id="\u521B\u5EFA\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u96C6\u7FA4" aria-hidden="true">#</a> \u521B\u5EFA\u96C6\u7FA4</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>eksctl create cluster --name dev --region ap-northeast-1 --max-pods-per-node <span class="token number">600</span> --ssh-access --ssh-public-key ~/.ssh/id_ed25519.pub --instance-prefix dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="argocd-\u5BC6\u7801\u83B7\u53D6" tabindex="-1"><a class="header-anchor" href="#argocd-\u5BC6\u7801\u83B7\u53D6" aria-hidden="true">#</a> argocd \u5BC6\u7801\u83B7\u53D6</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl -n argocd get secret argocd-initial-admin-secret -o <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&quot;{.data.password}&quot;</span> <span class="token operator">|</span> base64 -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="argocd-\u8C37\u6B4C\u767B\u5F55" tabindex="-1"><a class="header-anchor" href="#argocd-\u8C37\u6B4C\u767B\u5F55" aria-hidden="true">#</a> argocd \u8C37\u6B4C\u767B\u5F55</h2><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># argocd-rbac-cm</span>
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">policy.csv</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    p, rd@example.com, applications, *, project1/*, allow</span>
  <span class="token key atrule">policy.default</span><span class="token punctuation">:</span> role<span class="token punctuation">:</span>readonly
  <span class="token key atrule">scopes</span><span class="token punctuation">:</span> <span class="token string">&#39;[email, group]&#39;</span>
<span class="token comment"># argocd-cm</span>
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">dex.config</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    connectors:
    - config:
        issuer: https://accounts.google.com
        clientID: &quot;XXXX.apps.googleusercontent.com&quot;
        clientSecret: &quot;XXXX&quot;
      type: oidc
      id: google
      name: Google</span>
  <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//argocd.example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B58\u50A8" tabindex="-1"><a class="header-anchor" href="#\u5B58\u50A8" aria-hidden="true">#</a> \u5B58\u50A8</h2><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> xxx<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
<span class="token comment">## \u6302\u8F7D</span>
 <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xxx<span class="token punctuation">-</span>pvc
        <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
          <span class="token key atrule">claimName</span><span class="token punctuation">:</span> xxx<span class="token punctuation">-</span>pvc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4E34\u65F6pod" tabindex="-1"><a class="header-anchor" href="#\u4E34\u65F6pod" aria-hidden="true">#</a> \u4E34\u65F6pod</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl run mysql-client --image<span class="token operator">=</span>mysql -it --rm -- /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="mysql-\u542F\u52A8\u62A5\u9519" tabindex="-1"><a class="header-anchor" href="#mysql-\u542F\u52A8\u62A5\u9519" aria-hidden="true">#</a> mysql \u542F\u52A8\u62A5\u9519</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>skip-external-locking <span class="token comment"># \u591A\u4E2A\u6570\u636E\u5E93\u5B9E\u4F8B\u5171\u7528\u4E00\u4E2A\u6570\u636E\u76EE\u5F55</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13),c=[l];function t(d,p){return s(),n("div",null,c)}var r=a(i,[["render",t],["__file","aws.html.vue"]]);export{r as default};
