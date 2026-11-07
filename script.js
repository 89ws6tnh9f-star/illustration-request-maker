"use strict";

(() => {
  const SITE_NAME = "イラストご依頼メーカー";
  const $ = (selector) => document.querySelector(selector);

  /*
    [ID, 表示名, 種類, 選択肢または入力例, 横幅いっぱい]
    text：1行入力
    textarea：複数行入力
    radio：1つ選択
    check：複数選択
  */
  const groups = [
    {
      title: "依頼主情報",
      short: "依頼主",
      intro: "全項目任意です。必要な情報だけご記入ください。",
      fields: [
        ["name", "お名前・活動名", "text", "例：山田太郎"],
        ["category", "区分", "radio", ["個人", "法人・団体"]],
        ["company", "企業・団体名", "text", "企業・団体の場合にご記入ください"],
        ["contact", "連絡先", "text", "メールアドレスなど"],
        ["sns", "連絡用SNS・DMアカウント", "text", "例：X @your_name"],
        ["url", "活動URL・参考リンク", "text", "https://..."],
        [
          "platforms",
          "主な活動場所",
          "check",
          [
            "YouTube",
            "X（旧Twitter）",
            "Twitch",
            "IRIAM",
            "TikTok",
            "Instagram",
            "その他"
          ],
          true
        ]
      ]
    },
    {
      title: "依頼内容",
      short: "依頼内容",
      intro: "該当する項目を選択してください。",
      fields: [
        [
          "format",
          "イラストの形式",
          "check",
          [
            "全身",
            "膝上",
            "腰上",
            "胸上",
            "顔・アイコン",
            "SD・ミニキャラ",
            "一枚絵",
            "三面図・設定画",
            "Live2D用パーツ分け",
            "その他"
          ],
          true
        ],
        [
          "use",
          "使用用途",
          "check",
          [
            "配信・動画サムネイル",
            "歌ってみたMV",
            "SNSアイコン・ヘッダー",
            "TRPG・ゲーム",
            "メンバーシップ・ファンクラブ",
            "返礼品・グッズ",
            "個人鑑賞",
            "その他"
          ],
          true
        ],
        [
          "commercial",
          "商用利用・収益化",
          "radio",
          ["なし", "あり", "予定あり", "相談したい"],
          true
        ],
        [
          "background",
          "背景",
          "radio",
          [
            "なし（透過）",
            "単色・簡易な模様",
            "描き込み・指定あり",
            "おまかせ・相談"
          ],
          true
        ],
        [
          "costume",
          "衣装・キャラクターデザイン",
          "check",
          [
            "既存デザイン（資料あり）",
            "新規キャラクターデザイン",
            "新規衣装デザイン",
            "相談したい"
          ],
          true
        ],
        ["people", "描いてほしい人数", "text", "例：2人"],
        ["props", "小物・装飾", "text", "例：花束、剣、ぬいぐるみ"],
        [
          "base",
          "基本の表情・ポーズ",
          "textarea",
          "例：通常は口を閉じた微笑み。右手を腰に添えた立ち姿。",
          true
        ],
        [
          "variants",
          "追加したい差分",
          "textarea",
          "例：基本の表情に加えて、笑顔・怒り・泣き顔の3種類。ポーズは基本と同じ。",
          true
        ]
      ]
    },
    {
      title: "仕様・納期・予算",
      short: "仕様・予算",
      intro: "指定がない項目は、空欄や「指定なし」で構いません。",
      fields: [
        ["size", "サイズ（px）", "text", "例：縦3000 × 横2000／指定なし"],
        ["dpi", "解像度（dpi）", "text", "例：350dpi／指定なし"],
        ["color", "色形式", "radio", ["RGB", "CMYK", "指定なし"]],
        ["filetype", "納品形式", "text", "例：PNG（背景透過）、PSD"],
        ["budget", "予算の目安", "text", "例：20,000〜30,000円（手数料込み）"],
        ["deadline", "希望納期", "text", "希望日・時期／相談したい"],
        ["payment", "支払方法・取引サービス", "text", "例：SKIMA、ココナラ、銀行振込"],
        ["receipt", "領収書", "radio", ["不要", "必要"]],
        [
          "credit",
          "実績公開",
          "radio",
          [
            "納品後いつでも可能",
            "自身の告知・公開後から可能",
            "非公開を希望",
            "相談したい"
          ],
          true
        ],
        [
          "specnotes",
          "公開日・領収書の宛名など補足",
          "textarea",
          "公開可能な日付、納期の理由、仕様の補足など",
          true
        ]
      ]
    },
    {
      title: "詳細・参考資料",
      short: "詳細・資料",
      intro: "希望や設定をご記入ください。参考画像は2枚まで追加できます。",
      fields: [
        [
          "concept",
          "キャラクターのコンセプト・設定・性格",
          "textarea",
          "年齢、性格、世界観など",
          true
        ],
        [
          "appearance",
          "外見の特徴",
          "textarea",
          "髪型・瞳・体格・衣装・配色・人外パーツなど",
          true
        ],
        [
          "pose",
          "構図の希望",
          "textarea",
          "例：正面向きで全身が収まる構図。人物を中央に配置し、上部に文字用の余白を設ける。",
          true
        ],
        [
          "mood",
          "雰囲気・作風の方向性",
          "check",
          [
            "シンプル",
            "華やか",
            "かわいい",
            "かっこいい",
            "暖かい・明るい",
            "冷たい・ダーク",
            "アニメ塗り・ポップ",
            "厚塗り・重厚感",
            "おまかせ"
          ],
          true
        ],
        [
          "avoid",
          "避けたい表現・大切にしたいこと",
          "textarea",
          "変えないでほしい特徴、苦手な表現など",
          true
        ],
        [
          "other",
          "その他の要望・参考資料URL",
          "textarea",
          "複数キャラクターの詳細、参考画像の補足など",
          true
        ]
      ]
    }
  ];

  const state = {};
  const refs = [null, null];
  const imageVersions = [0, 0];
  const form = $("#brief-form");

  let current = 0;
  let dirty = false;
  let busy = false;
  let loadingImages = 0;
  let imageGeneration = 0;
  let outputURLs = [];

  /* HTML側のタイトルもサイト名に合わせます */
  document.title = `${SITE_NAME}｜イラスト依頼シート作成ツール`;

  const siteHeading = $(".site-header h1");

  if (siteHeading) {
    siteHeading.textContent = SITE_NAME;
  }

  /* HTML要素作成 */
  function el(tag, attributes = {}, text) {
    const node = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
      if (key === "class") {
        node.className = value;
      } else {
        node.setAttribute(key, value);
      }
    }

    if (text !== undefined) {
      node.textContent = text;
    }

    return node;
  }

  /* 操作結果のお知らせ */
  function notify(message) {
    const toast = $("#toast");

    toast.textContent = message;
    toast.classList.add("visible");

    clearTimeout(notify.timer);

    notify.timer = setTimeout(() => {
      toast.classList.remove("visible");
    }, 4500);
  }

  function value(id) {
    return Array.isArray(state[id])
      ? state[id].join("、")
      : (state[id] || "").trim();
  }

  function isOtherSelected(id, type) {
    return type === "check"
      ? (state[id] || []).includes("その他")
      : state[id] === "その他";
  }

  /* 空欄と非表示の「その他」を除いたデータ */
  function entries() {
    return groups
      .map((group) => {
        const rows = [];

        group.fields.forEach(([id, label, type, options]) => {
          const content = value(id);

          if (content) {
            rows.push({
              label,
              value: content
            });
          }

          const isChoice = type === "check" || type === "radio";

          if (
            !isChoice ||
            !Array.isArray(options) ||
            !options.includes("その他")
          ) {
            return;
          }

          const otherContent = value(`${id}Other`);

          if (isOtherSelected(id, type) && otherContent) {
            rows.push({
              label: `${label}：その他の内容`,
              value: otherContent
            });
          }
        });

        return {
          title: group.title,
          rows
        };
      })
      .filter((group) => group.rows.length > 0);
  }

  function filled() {
    return entries().reduce((total, group) => {
      return total + group.rows.length;
    }, 0);
  }

  function summaryValue(id) {
    const content = value(id);

    if (!content) return "";

    const selected = state[id];

    const hasOther = Array.isArray(selected)
      ? selected.includes("その他")
      : selected === "その他";

    const otherContent = value(`${id}Other`);

    return hasOther && otherContent
      ? `${content}（${otherContent}）`
      : content;
  }

  /* 右側の入力メモ */
  function updateSummary() {
    const root = $("#summary-items");
    root.replaceChildren();

    const items = [
      ["name", "お名前"],
      ["format", "イラスト形式"],
      ["use", "使用用途"],
      ["budget", "予算"],
      ["deadline", "希望納期"]
    ];

    for (const [id, label] of items) {
      const content = summaryValue(id);
      const row = el("div", { class: "summary-item" });

      row.append(
        el("small", {}, label),
        el(
          "p",
          { class: content ? "" : "empty" },
          content || "未入力"
        )
      );

      root.append(row);
    }

    $("#filled-count").textContent = `${filled()}項目 入力済み`;
  }

  function releaseOutputs() {
    outputURLs.forEach((url) => URL.revokeObjectURL(url));
    outputURLs = [];
  }

  /* ステップ移動 */
  function navigate(step, scroll = true) {
    if (busy) return;

    current = Math.max(0, Math.min(4, step));
    render();

    if (scroll) {
      $("#workspace").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  /* 画面描画 */
  function render() {
    releaseOutputs();

    const navigation = $(".steps");
    navigation.replaceChildren();

    const titles = [
      ...groups.map((group) => group.short),
      "確認・保存"
    ];

    titles.forEach((title, index) => {
      const button = el("button", {
        type: "button",
        class: "step" + (index === current ? " active" : ""),
        "aria-label": `${index + 1}. ${title}`
      });

      if (index === current) {
        button.setAttribute("aria-current", "step");
      }

      button.append(
        el("span", {}, String(index + 1)),
        document.createTextNode(title)
      );

      button.onclick = () => navigate(index);
      navigation.append(button);
    });

    form.replaceChildren();

    $("#prev").disabled = current === 0;
    $("#next").hidden = current === 4;
    $("#step-count").textContent = `${current + 1} / 5`;

    if (current === 4) {
      renderReview();
      return;
    }

    const group = groups[current];

    form.append(
      el("h2", {}, group.title),
      el("p", { class: "section-intro" }, group.intro)
    );

    const grid = el("div", { class: "field-grid" });

    group.fields.forEach((field) => {
      grid.append(renderField(field));
    });

    if (current === 3) {
      const wrapper = el("div", { class: "field full" });

      wrapper.append(
        el("p", { class: "field-title" }, "参考画像（2枚まで）"),
        el(
          "p",
          { class: "help" },
          "PNG・JPEG・WebP・GIF／1枚20MBまで。GIFは静止画として保存します。"
        )
      );

      const uploads = el("div", { class: "uploads" });

      refs.forEach((_, index) => {
        uploads.append(renderUpload(index));
      });

      wrapper.append(uploads);
      grid.append(wrapper);
    }

    form.append(grid);
  }

  /* 入力欄 */
  function renderField([id, label, type, options, full]) {
    const isChoice = type === "check" || type === "radio";

    const wrapper = el(
      isChoice ? "fieldset" : "div",
      { class: "field" + (full ? " full" : "") }
    );

    wrapper.append(
      el(
        isChoice ? "legend" : "label",
        isChoice ? {} : { for: id },
        label
      )
    );

    if (!isChoice) {
      const input = el(
        type === "textarea" ? "textarea" : "input",
        {
          id,
          name: id,
          ...(type === "textarea"
            ? { rows: "3" }
            : { type: "text" }),
          placeholder: options,
          maxlength: type === "textarea" ? "8000" : "1000"
        }
      );

      input.value = state[id] || "";

      input.oninput = () => {
        state[id] = input.value;
        dirty = true;
        updateSummary();
      };

      wrapper.append(input);
      return wrapper;
    }

    const list = el("div", { class: "choices" });
    const hasOther = options.includes("その他");
    const otherKey = `${id}Other`;

    let otherBox = null;

    function updateOtherVisibility() {
      if (otherBox) {
        otherBox.hidden = !isOtherSelected(id, type);
      }
    }

    options.forEach((option, index) => {
      const choice = el("label", { class: "choice" });

      const input = el("input", {
        type: type === "check" ? "checkbox" : "radio",
        id: `${id}-${index}`,
        name: id,
        value: option
      });

      input.checked = type === "check"
        ? (state[id] || []).includes(option)
        : state[id] === option;

      input.onchange = () => {
        state[id] = type === "check"
          ? [...list.querySelectorAll("input:checked")]
              .map((node) => node.value)
          : option;

        dirty = true;
        updateOtherVisibility();
        updateSummary();
      };

      choice.append(input, document.createTextNode(option));
      list.append(choice);
    });

    wrapper.append(
      list,
      el(
        "p",
        { class: "help" },
        type === "check"
          ? "複数選択できます"
          : "未選択でも進めます"
      )
    );

    /* 「その他」選択時の自由記述欄 */
    if (hasOther) {
      otherBox = el("div", {
        class: "other-field",
        id: `${id}-other-box`
      });

      otherBox.style.marginTop = "12px";

      const otherLabel = el(
        "label",
        { for: `${id}-other` },
        "その他の内容"
      );

      Object.assign(otherLabel.style, {
        display: "block",
        marginBottom: "7px",
        fontSize: "12px",
        fontWeight: "600"
      });

      const otherInput = el("textarea", {
        id: `${id}-other`,
        name: otherKey,
        rows: "2",
        maxlength: "8000",
        placeholder: "具体的な内容をご記入ください"
      });

      otherInput.style.minHeight = "80px";
      otherInput.value = state[otherKey] || "";

      otherInput.oninput = () => {
        state[otherKey] = otherInput.value;
        dirty = true;
        updateSummary();
      };

      otherBox.append(otherLabel, otherInput);
      wrapper.append(otherBox);
      updateOtherVisibility();
    }

    if (type === "radio") {
      const clear = el(
        "button",
        { type: "button", class: "text-button" },
        "選択を解除"
      );

      clear.onclick = () => {
        state[id] = "";

        list.querySelectorAll("input").forEach((input) => {
          input.checked = false;
        });

        dirty = true;
        updateOtherVisibility();
        updateSummary();
      };

      wrapper.append(clear);
    }

    return wrapper;
  }

  /* 参考画像の枠 */
  function renderUpload(index) {
    const wrapper = el("div", {
      class: "upload",
      "data-index": index
    });

    const input = el("input", {
      type: "file",
      id: `reference-${index}`,
      accept: "image/png,image/jpeg,image/webp,image/gif"
    });

    const label = el("label", {
      for: `reference-${index}`
    });

    if (refs[index]) {
      label.append(
        el("img", {
          src: refs[index].url,
          alt: `参考画像${index + 1}`
        }),
        el("span", {}, `参考画像${index + 1}を変更`)
      );
    } else {
      label.append(
        el("span", { class: "plus" }, "＋"),
        el("span", {}, `参考画像${index + 1}を追加`),
        el("small", {}, "タップ／ドラッグ＆ドロップ")
      );
    }

    input.onchange = () => {
      loadImage(input.files[0], index);
    };

    wrapper.append(input, label);

    if (refs[index]) {
      const remove = el(
        "button",
        { type: "button", class: "remove-image" },
        "画像を削除"
      );

      remove.onclick = () => {
        imageVersions[index] += 1;
        URL.revokeObjectURL(refs[index].url);
        refs[index] = null;
        dirty = true;
        refreshUpload(index);
      };

      wrapper.append(remove);
    }

    wrapper.ondragover = (event) => {
      event.preventDefault();
      wrapper.classList.add("drag");
    };

    wrapper.ondragleave = () => {
      wrapper.classList.remove("drag");
    };

    wrapper.ondrop = (event) => {
      event.preventDefault();
      wrapper.classList.remove("drag");
      loadImage(event.dataTransfer.files[0], index);
    };

    return wrapper;
  }

  function refreshUpload(index) {
    const wrapper = document.querySelector(
      `.upload[data-index="${index}"]`
    );

    if (wrapper) {
      wrapper.replaceWith(renderUpload(index));
    }
  }

  /* 参考画像読み込み */
  async function loadImage(file, index) {
    if (!file) return;

    const allowed = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/gif"
    ];

    if (!allowed.includes(file.type)) {
      notify("PNG・JPEG・WebP・GIFの画像を選んでください。");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      notify("1枚20MB以下の画像を選んでください。");
      return;
    }

    const generation = imageGeneration;
    const version = ++imageVersions[index];
    const sourceURL = URL.createObjectURL(file);

    let stableURL = null;
    loadingImages += 1;

    try {
      const image = new Image();
      image.src = sourceURL;
      await image.decode();

      if (image.naturalWidth * image.naturalHeight > 40000000) {
        throw new Error("large");
      }

      const canvas = document.createElement("canvas");

      const scale = Math.min(
        1,
        2200 / Math.max(image.naturalWidth, image.naturalHeight)
      );

      canvas.width = Math.max(
        1,
        Math.round(image.naturalWidth * scale)
      );

      canvas.height = Math.max(
        1,
        Math.round(image.naturalHeight * scale)
      );

      canvas.getContext("2d").drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      canvas.width = 1;
      canvas.height = 1;

      if (!blob) throw new Error("decode");

      stableURL = URL.createObjectURL(blob);

      const stableImage = new Image();
      stableImage.src = stableURL;
      await stableImage.decode();

      if (
        generation !== imageGeneration ||
        version !== imageVersions[index]
      ) {
        URL.revokeObjectURL(stableURL);
        stableURL = null;
        return;
      }

      if (refs[index]) {
        URL.revokeObjectURL(refs[index].url);
      }

      refs[index] = {
        url: stableURL,
        image: stableImage,
        name: file.name
      };

      stableURL = null;
      dirty = true;
      refreshUpload(index);

      if (current === 4) {
        render();
      }

      notify(`参考画像${index + 1}を追加しました。`);
    } catch (error) {
      if (stableURL) {
        URL.revokeObjectURL(stableURL);
      }

      if (
        generation === imageGeneration &&
        version === imageVersions[index]
      ) {
        notify(
          error.message === "large"
            ? "画像の縦横サイズを小さくしてから追加してください。"
            : "画像を読み込めませんでした。別の画像をお試しください。"
        );
      }
    } finally {
      URL.revokeObjectURL(sourceURL);
      loadingImages -= 1;
    }
  }

  /* コピー・TXT用の文章 */
  function briefText() {
    let text = "イラスト依頼オーダーシート\n";

    for (const group of entries()) {
      text += `\n【${group.title}】\n`;

      for (const row of group.rows) {
        text += `${row.label}：${row.value}\n`;
      }
    }

    if (refs.some(Boolean)) {
      text += "\n【参考画像】\n";

      text += refs
        .map((reference, index) => {
          return reference
            ? `参考画像${index + 1}：${reference.name}`
            : "";
        })
        .filter(Boolean)
        .join("\n");

      text +=
        "\n※文章だけ送る場合は、参考画像を別途添付してください。\n";
    }

    return text;
  }

  /* 確認・保存画面 */
  function renderReview() {
    form.append(
      el("h2", {}, "確認・保存"),
      el(
        "p",
        { class: "section-intro" },
        "内容を確認し、画像または文章で保存してください。"
      )
    );

    const hasContent = filled() > 0 || refs.some(Boolean);

    if (!hasContent) {
      form.append(
        el(
          "p",
          { class: "notice" },
          "入力内容がありません。前のステップで入力してください。"
        )
      );
    }

    const actions = el("div", { class: "export-actions" });

    const imageButton = el(
      "button",
      { type: "button", class: "primary", id: "export" },
      "A4画像を保存（ZIP）"
    );

    imageButton.disabled = !hasContent;
    imageButton.onclick = exportImages;

    const copyButton = el(
      "button",
      { type: "button", class: "secondary" },
      "文章をコピー"
    );

    copyButton.disabled = !hasContent;
    copyButton.onclick = copyText;

    const textButton = el(
      "button",
      { type: "button", class: "secondary" },
      "文章を保存（TXT）"
    );

    textButton.disabled = !hasContent;

    textButton.onclick = () => {
      download(
        new Blob(
          [briefText()],
          { type: "text/plain;charset=utf-8" }
        ),
        "illustration-brief.txt"
      );
    };

    actions.append(imageButton, copyButton, textButton);

    form.append(
      actions,
      el(
        "p",
        { class: "help" },
        "画像はA4比率のPNGです。文章量に応じてページが増えます。参考画像は別ページにまとめます。"
      )
    );

    const review = el("div", { class: "review" });

    for (const group of entries()) {
      review.append(el("h3", {}, group.title));

      const list = el("dl");

      for (const row of group.rows) {
        list.append(
          el("dt", {}, row.label),
          el("dd", {}, row.value)
        );
      }

      review.append(list);
    }

    if (refs.some(Boolean)) {
      review.append(el("h3", {}, "参考画像"));

      const images = el("div", { class: "review-images" });

      refs.forEach((reference, index) => {
        if (!reference) return;

        images.append(
          el("img", {
            src: reference.url,
            alt: `参考画像${index + 1}`
          })
        );
      });

      review.append(images);
    }

    form.append(
      review,
      el("div", {
        id: "export-result",
        class: "export-result"
      }),
      el(
        "p",
        { class: "notice" },
        "自動保存はありません。ページを閉じる前に保存してください。"
      )
    );
  }

  /* 文章コピー */
  async function copyText() {
    try {
      await navigator.clipboard.writeText(briefText());
      notify("文章をコピーしました。");
    } catch {
      const result = $("#export-result");
      if (!result) return;

      releaseOutputs();

      const area = el("textarea", {
        "aria-label": "コピー用の依頼内容"
      });

      area.value = briefText();

      result.replaceChildren(
        el(
          "p",
          { class: "help" },
          "以下の文章を選択してコピーしてください。"
        ),
        area
      );

      area.focus();
      area.select();
    }
  }

  /* ファイル保存 */
  function download(blob, name) {
    const url = URL.createObjectURL(blob);

    const link = el("a", {
      href: url,
      download: name
    });

    document.body.append(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
  }

  /* 画像内の文章折り返し */
  function wrapText(context, text, width) {
    const lines = [];

    for (const paragraph of text.replace(/\r/g, "").split("\n")) {
      let line = "";

      for (const character of paragraph) {
        if (
          line &&
          context.measureText(line + character).width > width
        ) {
          lines.push(line);
          line = character;
        } else {
          line += character;
        }
      }

      lines.push(line);
    }

    return lines;
  }

  /*
    A4比率のPNGを1ページずつ作成
    サイズ：1240 × 1754px
  */
  async function createImageFiles(onPage) {
    const width = 1240;
    const height = 1754;
    const margin = 85;
    const bottom = 1615;

    const theme = {
      background: "#ffffff",
      blue: "#00a8df",
      text: "#20252b",
      muted: "#687583",
      line: "#d5dde4",
      section: "#eaf8fd",
      imageBackground: "#f3fbfe"
    };

    let canvas;
    let context;
    let y;
    let pageNumber = 0;

    function newPage() {
      pageNumber += 1;

      canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      context = canvas.getContext("2d");

      context.fillStyle = theme.background;
      context.fillRect(0, 0, width, height);

      context.fillStyle = theme.text;
      context.font = "bold 36px sans-serif";
      context.fillText(
        "イラスト依頼オーダーシート",
        margin,
        110
      );

      context.fillStyle = theme.blue;
      context.fillRect(
        margin,
        140,
        width - margin * 2,
        3
      );

      y = 195;
    }

    async function finishPage() {
      if (!canvas) return;

      context.strokeStyle = theme.line;
      context.beginPath();
      context.moveTo(margin, 1674);
      context.lineTo(width - margin, 1674);
      context.stroke();

      context.font = "16px sans-serif";
      context.fillStyle = theme.muted;
      context.fillText(SITE_NAME, margin, 1710);

      context.textAlign = "right";
      context.fillText(
        String(pageNumber),
        width - margin,
        1710
      );
      context.textAlign = "left";

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) throw new Error("encode");

      await onPage(blob, pageNumber);

      canvas.width = 1;
      canvas.height = 1;
      canvas = null;
    }

    async function nextPage() {
      await finishPage();
      newPage();
    }

    const content = entries();

    try {
      if (content.length || !refs.some(Boolean)) {
        newPage();
      }

      for (const group of content) {
        if (y + 160 > bottom) {
          await nextPage();
        }

        context.fillStyle = theme.section;
        context.fillRect(
          margin,
          y - 26,
          width - margin * 2,
          50
        );

        context.fillStyle = theme.text;
        context.font = "bold 24px sans-serif";
        context.fillText(group.title, margin + 16, y + 8);

        y += 60;

        for (const row of group.rows) {
          context.font = "25px sans-serif";

          const lines = wrapText(
            context,
            row.value,
            width - margin * 2 - 10
          );

          context.font = "bold 20px sans-serif";

          const labelLines = wrapText(
            context,
            row.label,
            width - margin * 2
          );

          const labelHeight = labelLines.length * 29;

          if (y + labelHeight + 45 > bottom) {
            await nextPage();
          }

          context.font = "bold 20px sans-serif";
          context.fillStyle = theme.muted;

          for (const labelLine of labelLines) {
            context.fillText(labelLine, margin, y);
            y += 29;
          }

          y += 9;

          for (const line of lines) {
            if (y + 32 > bottom) {
              await nextPage();

              context.font = "18px sans-serif";

              const continuationLines = wrapText(
                context,
                row.label + "（続き）",
                width - margin * 2
              );

              context.fillStyle = theme.muted;

              for (const continuationLine of continuationLines) {
                context.fillText(continuationLine, margin, y);
                y += 26;
              }

              y += 10;
            }

            context.font = "25px sans-serif";
            context.fillStyle = theme.text;
            context.fillText(line, margin, y);

            y += 36;
          }

          y += 24;
        }

        y += 15;
      }

      if (refs.some(Boolean)) {
        if (canvas) {
          await finishPage();
        }

        newPage();

        context.fillStyle = theme.section;
        context.fillRect(
          margin,
          y - 26,
          width - margin * 2,
          50
        );

        context.fillStyle = theme.text;
        context.font = "bold 24px sans-serif";
        context.fillText("参考画像", margin + 16, y + 8);

        let slot = 0;

        refs.forEach((reference, index) => {
          if (!reference) return;

          const top = 270 + slot * 650;

          context.font = "bold 21px sans-serif";
          context.fillStyle = theme.text;
          context.fillText(
            `参考画像 ${index + 1}`,
            margin,
            top - 18
          );

          context.fillStyle = theme.imageBackground;
          context.fillRect(
            margin,
            top,
            width - margin * 2,
            570
          );

          const image = reference.image;

          const scale = Math.min(
            (width - margin * 2 - 32) / image.naturalWidth,
            538 / image.naturalHeight
          );

          const imageWidth = image.naturalWidth * scale;
          const imageHeight = image.naturalHeight * scale;

          context.drawImage(
            image,
            (width - imageWidth) / 2,
            top + (570 - imageHeight) / 2,
            imageWidth,
            imageHeight
          );

          slot += 1;
        });
      }

      await finishPage();
      return pageNumber;
    } finally {
      if (canvas) {
        canvas.width = 1;
        canvas.height = 1;
      }
    }
  }

  /* ZIP用チェックサム */
  function crc32(bytes) {
    let crc = 0xffffffff;

    for (const byte of bytes) {
      crc ^= byte;

      for (let bit = 0; bit < 8; bit++) {
        crc = (crc >>> 1) ^
          ((crc & 1) ? 0xedb88320 : 0);
      }
    }

    return (crc ^ 0xffffffff) >>> 0;
  }

  /* 外部ライブラリなしでZIP作成 */
  function zipFiles(files) {
    const local = [];
    const central = [];

    let offset = 0;
    let centralSize = 0;

    for (const file of files) {
      const name = new TextEncoder().encode(file.name);
      const data = file.bytes;
      const checksum = crc32(data);

      const header = new Uint8Array(30 + name.length);
      const view = new DataView(header.buffer);

      view.setUint32(0, 0x04034b50, true);
      view.setUint16(4, 20, true);
      view.setUint16(12, 33, true);
      view.setUint32(14, checksum, true);
      view.setUint32(18, data.length, true);
      view.setUint32(22, data.length, true);
      view.setUint16(26, name.length, true);

      header.set(name, 30);
      local.push(header, data);

      const record = new Uint8Array(46 + name.length);
      const recordView = new DataView(record.buffer);

      recordView.setUint32(0, 0x02014b50, true);
      recordView.setUint16(4, 20, true);
      recordView.setUint16(6, 20, true);
      recordView.setUint16(14, 33, true);
      recordView.setUint32(16, checksum, true);
      recordView.setUint32(20, data.length, true);
      recordView.setUint32(24, data.length, true);
      recordView.setUint16(28, name.length, true);
      recordView.setUint32(42, offset, true);

      record.set(name, 46);
      central.push(record);

      offset += header.length + data.length;
      centralSize += record.length;
    }

    const end = new Uint8Array(22);
    const endView = new DataView(end.buffer);

    endView.setUint32(0, 0x06054b50, true);
    endView.setUint16(8, files.length, true);
    endView.setUint16(10, files.length, true);
    endView.setUint32(12, centralSize, true);
    endView.setUint32(16, offset, true);

    return new Blob(
      [...local, ...central, end],
      { type: "application/zip" }
    );
  }

  /* 画像・ZIP保存 */
  async function exportImages() {
    if (busy) return;

    if (loadingImages > 0) {
      notify("参考画像の読み込みが終わってから保存してください。");
      return;
    }

    busy = true;

    const button = $("#export");
    const result = $("#export-result");

    const actionButtons = [
      ...document.querySelectorAll(".export-actions button")
    ];

    actionButtons.forEach((item) => {
      item.disabled = true;
    });

    button.textContent = "画像を作成しています…";

    releaseOutputs();
    result.replaceChildren();

    const title = el("h3", {}, "画像を作成しています…");

    const help = el(
      "p",
      { class: "help" },
      "ZIPが保存できない場合は、各画像の保存ボタンをご利用ください。iPadでは画像を長押しして保存することもできます。"
    );

    const previews = el("div", {
      class: "preview-pages"
    });

    result.append(title, help, previews);

    try {
      await new Promise((resolve) => setTimeout(resolve, 30));
      await document.fonts.ready;

      const files = [];

      const count = await createImageFiles(async (blob, number) => {
        const name =
          `illustration-brief-${String(number).padStart(2, "0")}.png`;

        files.push({
          name,
          bytes: new Uint8Array(await blob.arrayBuffer())
        });

        const url = URL.createObjectURL(blob);
        outputURLs.push(url);

        const preview = el("div", {
          class: "preview-page"
        });

        preview.append(
          el("img", {
            src: url,
            alt: `依頼シート ${number}ページ目`
          }),
          el(
            "a",
            {
              href: url,
              download: name,
              class: "download-link"
            },
            `${number}ページ目を保存`
          )
        );

        previews.append(preview);
        title.textContent = `${number}枚目を作成しました…`;
      });

      const archive = zipFiles(files);
      const zipURL = URL.createObjectURL(archive);
      outputURLs.push(zipURL);

      const zipLink = el(
        "a",
        {
          href: zipURL,
          download: "illustration-brief.zip",
          class: "download-link"
        },
        "ZIPを保存"
      );

      result.prepend(zipLink);
      title.textContent = `${count}枚の画像を作成しました`;

      zipLink.click();

      notify(
        `${count}枚の画像を作成しました。保存先をご確認ください。`
      );
    } catch {
      title.textContent = "画像を作成できませんでした。";

      notify(
        "文章保存をお試しいただくか、入力内容や参考画像を小さくしてください。"
      );
    } finally {
      busy = false;

      actionButtons.forEach((item) => {
        item.disabled = false;
      });

      button.textContent = "A4画像を保存（ZIP）";
    }
  }

  /* 操作 */
  $("#prev").onclick = () => navigate(current - 1);
  $("#next").onclick = () => navigate(current + 1);

  form.onsubmit = (event) => {
    event.preventDefault();
  };

  $("#reset").onclick = () => {
    if (!busy) {
      $("#reset-dialog").showModal();
    }
  };

  $("#cancel-reset").onclick = () => {
    $("#reset-dialog").close();
  };

  $("#confirm-reset").onclick = () => {
    imageGeneration += 1;

    for (const key of Object.keys(state)) {
      delete state[key];
    }

    refs.forEach((reference, index) => {
      imageVersions[index] += 1;

      if (reference) {
        URL.revokeObjectURL(reference.url);
      }

      refs[index] = null;
    });

    releaseOutputs();
    dirty = false;

    $("#reset-dialog").close();
    navigate(0);
    updateSummary();

    notify("入力をクリアしました。");
  };

  /* 対応ブラウザでは離脱時に確認 */
  window.addEventListener("beforeunload", (event) => {
    if (dirty) {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  /* 戻る操作で入力内容を復元しない */
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      location.reload();
    }
  });

  render();
  updateSummary();
})();