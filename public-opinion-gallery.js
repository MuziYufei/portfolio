(() => {
  // Keep the original desktop layout inside each responsive 16:9 preview.
  document.querySelectorAll('.online-platform-frame').forEach((frame) => {
    const viewport = document.createElement('div');
    viewport.className = 'online-desktop-viewport';
    frame.before(viewport);
    viewport.append(frame);
    const resize = () => {
      frame.style.transform = `scale(${viewport.clientWidth / 1920})`;
    };
    new ResizeObserver(resize).observe(viewport);
    resize();
  });
  const root = document.querySelector('[data-card-atlas]');
  if (!root) return;

  const lang = root.dataset.lang === 'zh' ? 'zh' : 'en';
  const assets = root.dataset.assets || '../assets/public-opinion';
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
  const cardImages = {"labels/label-bailan.jpg":{"src":"../optimized/card-label-bailan-e0c544c279.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAACwBACdASoVACAAPxFyr1GsJyQit/qoAYAiCWIAyiCIx83xo8t9dRyRmjGENyAAAP7uNP68qttLhquhQzVl673919Vp4Id6QPTCdJTWdigr2hWmiEQ5nqikeYs8L3D4BAAAAA=="},"labels/label-dongwang.jpg":{"src":"../optimized/card-label-dongwang-269f751918.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAACwBACdASoVACAAPx12sVGtJySjt/VYAaAjiWIAygBHfs2FD/bgZsZeZA953lPgAP7rhVe2GtKwnN4TcjcFPtXls/rjzbch33JZYzPa01WrYfdIkB8NCUBa/nspxI2AAAA="},"labels/label-erjiguan.jpg":{"src":"../optimized/card-label-erjiguan-04bdf79ede.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAwCdASoVACAAPwVsq1GrpiQit+gBcCCJYwDKAEjRMGkR+RwBAKBAAP7v2RyewN7u1zxbMpyvhrZCKdfmzbdvyNcKVc6ppveAAAAA"},"labels/label-fuduji.jpg":{"src":"../optimized/card-label-fuduji-e3bc0e250b.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAAAQBACdASoVACAAPw14rlGsKCQit/qoAYAhiUAZIgu4EXv1xkOVUJMMwAD+8E7ac5ZucmNe1k7ysdvatwaMf5D8PQ0inRf5LWcDd85025YAAA=="},"labels/label-gangjing.jpg":{"src":"../optimized/card-label-gangjing-c5b64ca1ee.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwAwCdASoVACAAPx12sVGtJySit/VYAaAjiWQAzNBR7lAD61J1K/gAAP7wNHtXv15JBf+sKTS+da/yattYUh2ryUyy9tSkvaM95rHmgiBUbBRT6S/A4Dv4TK5d98O17SPxjH0N7AAAAA=="},"labels/label-jianpanxia.jpg":{"src":"../optimized/card-label-jianpanxia-a13c252842.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAwBACdASoVACAAPw12rlGsJ6Qit/qoAYAhiUAZQAu4ERZ6zXkxqUBkskAA/vBpL7aNhvn8zAXm1FO8F/+4q48PKYzj7iqEK5MFcXVAtVf+NTMu7QAAAA=="},"labels/label-laoshiren.jpg":{"src":"../optimized/card-label-laoshiren-de81b64779.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAACwAwCdASoVACAAPwlwrFGrpqQnt+gBcCEJYgDNhEiGqL9d+tZqAAD+77ZeDqbo1xxZN+0b/vWLYTfsGXpl/5UdnL3/KNxjawAAAA=="},"labels/label-leziren.jpg":{"src":"../optimized/card-label-leziren-a322cb8dd0.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADwAwCdASoVACAAPxF0r1GsJyQjt/qoAYAiCUAAHGVBP6a3cGfqcECAAP7rhVfhGJl1L5xulNlanF6cpqhgBxkA8rtfm8a6EU2vYPAlghiwkZaBfjFMrl4f63D4FIuxoQAAAA=="},"labels/label-qiqiang.jpg":{"src":"../optimized/card-label-qiqiang-4b0578952a.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAwCdASoVACAAPw14rlGsKCQit/qoAYAhiUAZQAu4ER7bk4V4nDMIAP7wTtQUs17u1zxb7g3JjqMjl2qcKd3wC6yd1GL2XZkuXNP2AAA="},"labels/label-sanguandang.jpg":{"src":"../optimized/card-label-sanguandang-91b2dc24a4.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPxFwr1GsJqQnt/qoAYAiCWIAygBXNcYGkPXHq8UBL5Rco4AA/uuLXrrHTjg1ajGYLcfAidxzebdsoRkssF280RJs+p6jUriLqa0xsXF3q9Vu1hqWwpRRtekRGAAAAA=="},"labels/label-xidigong.jpg":{"src":"../optimized/card-label-xidigong-b8d53660b2.webp","w":745,"h":1123,"preview":"data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADQAwCdASoVACAAPwVwrVGrpqSit+gBcCCJZQAAkfrt8S0EuaaZ5tQA/ufr//JJSuloZpWDSXGl+itn6l5JKRT+fxaKNjeMJqIO+rINShKAwCVgAAA="},"questions/q-01.jpg":{"src":"../optimized/card-q-01-46ab6f63b1.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADQBACdASoVACAAPyWGulUuKSWjKAqpwCSJaQAAJa939C6dGcU5hO4WQCsGhTISgAD+tpyGcMUmcA100Z2cay4ANqACWLN3D8Mz/+7JmnnUy2QDREAlaqFb+jI0Bb4dAvMvj24AAAA="},"questions/q-02.jpg":{"src":"../optimized/card-q-02-5962d7d4aa.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQBACdASoVACAAPyWGu1WuKSYjKAqpwCSJaQAAJa8l93wPY1yGM3j8mbU6RNgA/rachnDFJnANdX6rtgG5DfcHZdCiemW3tuDMsJQWItk3Qg60Ngv9O1Mi73uVek2jrzr37BroAAA="},"questions/q-03.jpg":{"src":"../optimized/card-q-03-7f7da018a4.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADQBACdASoVACAAPyWEvFUuKKYjKAqpwCSJaQAAJa8l9nfXbuZclUDZ7nudkCb3QAD+tpyGcMUmcA11fqvh+FPnjqELwAPRO9l4cp95IyyWBgrh0CZWYJYUdqsJ2zom6+CKXiAAAAA="},"questions/q-04.jpg":{"src":"../optimized/card-q-04-c3ac820fa5.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABwBACdASoVACAAPyV8uVSuJyWjMBgIAcAkiWkAACWvJiJ0GrZFNHxo88aCgAD+tpyGcMUmcA12bQh8yyn1k9eaX/9BWZeYBgc7ar2sBlh2J/tEK2tRaJmVLCvynbOhwzy0ed0OgAA="},"questions/q-05.jpg":{"src":"../optimized/card-q-05-c0aaa91df7.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAQBACdASoVACAAPyWEvFSuKKajKAqpwCSJaQAAJOqqawEY+SMmC2VQAAD+tpyGcMUmcA11tivmaBBhHFxSR9xlzicjDmhxhQ3ou1od0ywSfweslM1o4Ah71P40vlYTtnR2IqmbuDgAAAAA"},"questions/q-06.jpg":{"src":"../optimized/card-q-06-bcdc1b1b96.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACQBACdASoVACAAPyWCvFSuKCajKAqpwCSJaQAAJa8i8tVOy33NisTKjCHj/XAA/rachnDFJnANdX61ZSI+tiVG7BA4X6uNeJh3Vt2oYSOXnRXtJD0X3rJfYnT7YZ1V+XcHAAAA"},"questions/q-07.jpg":{"src":"../optimized/card-q-07-2c5805beff.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAACwBACdASoVACAAPyV8t1UuJyUjMBgIAcAkiWkAACWvJanCK82AdK+c1WbzhUgAAP62nIZwxSZwDXV+q+H0tbfmA0sDjsGSWT5Iya/YCzMyqIM0phcpc7SPfHmWYgozvswAAA=="},"questions/q-08.jpg":{"src":"../optimized/card-q-08-369c0fde1f.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAABwBACdASoVACAAPyV+t1QuJ6UjMBgIAcAkiWkAACWvdVwAf6o4siS9vUHiAAD+tpyGcMUmcA11fAhFqVzQ1GhAJ2bu33KuFhp6Wh9NtUEdzNW7jb3MGHopl3Yhdx6nbOibvEiMBW7AAAAA"},"questions/q-09.jpg":{"src":"../optimized/card-q-09-0298dceec0.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACwBACdASoVACAAPyWAuVQuKCWjMBgIAcAkiWkAACWvIw1x5eFdQTiJqZC9+xEAAP62nIZwxSZwDXV+tCa7DOo5SzgvkrlOOjbsZS+FEANJ8kZNxqBIdq4yZHrGOOcxXAX8dw6cBvl9sAAA"},"questions/q-10.jpg":{"src":"../optimized/card-q-10-dd781ca7ae.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyWEvFUuKCYjKAqpwCSJaQAAJa8l30VZl9hSvtiuSmJP3AAA/rachnDFJnANdX6r4quP8ll9eT3AIwxuV8GHSXaCylZDCaJ8lj7SQkUxOZLVYTd1bWkBz+0BCkAAAA=="},"questions/q-11.jpg":{"src":"../optimized/card-q-11-ddd28c8079.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABwBACdASoVACAAPyWEvFSuKKajKAqpwCSJaQAAJa8hxG6MwIGH8ng3y6A1gAD+tpyGcMUmcA11frVlExrQXEf2WXsocn2mU6Q9JGqL/WlItm4bSJqNo0HKm1Z5rQ6GZB4ced0gAAA="},"questions/q-12.jpg":{"src":"../optimized/card-q-12-88d20455ac.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAQBACdASoVACAAPyWEvFSuKKajKAqpwCSJaQAAJa7aQB1Df70qj1eNAAD+tpyGcMUmcA1021mnVIowAGj+xK+rLYqCrKwpZg1DIrOlA17sOnK7p9XqadqXiaeyz4QX+1pEz42pdsAAAA=="},"questions/q-13.jpg":{"src":"../optimized/card-q-13-04bd024828.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACQBACdASoVACAAPyV8t1QuJyUjMBgIAcAkiWkAACWvJldexRN/cx5nwIKPtOAA/rachnDFJnANdX6ts9xs8+U+dXwhLcvZ05pfyMJkOp2YDK5iOkxlt1xxHs0G97tvA3u6RVis0x0CQAAA"},"questions/q-14.jpg":{"src":"../optimized/card-q-14-125124f656.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABwBACdASoVACAAPyWEvVUuKKcjKAqpwCSJaQAAJa71YYTomXMKchPSq2VOiAD+tpyGcMUmcA1021YOUaYdMowr8EaxyXHwjCx4oiEKsZbdcUDJcVEDNPYKEV+XQhPu9wAAAA=="},"questions/q-15.jpg":{"src":"../optimized/card-q-15-405c76e2f6.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACwBACdASoVACAAPyV8uVUuJyWjMBgIAcAkiWkAACWvJcIr/aEwFBpYIlfKjl1QAP62nIZwxSZwDXV+sl4NuaMlfR0NWA/1CCGqUV86Q8o2LImv7UcdetdQNGgYagMcHx4ced0gAAA="},"questions/q-16.jpg":{"src":"../optimized/card-q-16-43c071a6db.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABwBACdASoVACAAPyWCvFSuKCajKAqpwCSJaQAAJa71WPquyxASIl53qzBtgAD+tpyGcMUmcA12bQse2GXelNTMdxaVKp5+Z+oMNtV7WcAzJdAyVo4Ah71QlxHmIoVOZI3aHSFwAAA="},"questions/q-17.jpg":{"src":"../optimized/card-q-17-ea8795bc1f.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABQBACdASoVACAAPyV6uVSuJyWjMBgIAcAkiWkAACUqK1dEL0oLRJ7Oq8UAAP62nIZwxSZwDXXDfYhnI8FCj5pwOrk0JMZAGT1p2jVo5i6JBRYhW1qIjq0tRDVYTtnRN18EUwIAAAA="},"questions/q-18.jpg":{"src":"../optimized/card-q-18-073f707b8f.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACwBACdASoVACAAPyV+uVSuJ6WjMBgIAcAkiWkAACWvIuI+s7cllmDunDL4kPoAAP62nIZwxSZwDXV+tWUkjCa3kr6sVBuyKajRpQQcCGvnRiIKwhyV1w6W/8qDT80UsmqSMP6pqeAAAA=="},"questions/q-19.jpg":{"src":"../optimized/card-q-19-06666b6a63.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyWCuVSuKKWjMBgIAcAkiWkAACWvIfxmkCTEds3OCoeneSAA/rachnDFJnANdX61ZR1r1EbADqQzsM2rZGsosJpnLTSHr5xFcwG/ZoHjZ4WE7eBvd0jdodE2sAAAAA=="},"questions/q-20.jpg":{"src":"../optimized/card-q-20-f724cfac8d.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACQBACdASoVACAAPyWAuVQuKCWjMBgIAcAkiWkAACWvIvBnL3jLWAPefXjKRgAA/rachnDFJnANdX61ZSSXT5WupK+qzI7utH4R+dD5Mlwr50gGvx5QVQmeIXajZvwk3QRH2BBaNAvUAAAA"},"questions/q-21.jpg":{"src":"../optimized/card-q-21-f54c873b54.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABwBACdASoVACAAPyWGu1WuKSYjKAqpwCSJaQAAJa8irRELR0nNKvQ1bKy+CAD+tpyGcMUmcA11frQmrmWMDTOHOWjDXePmyAfi5Nbl7g2tnuG0iaN+KuH62WdwQRQUW6j1eVGAAAA="},"questions/q-22.jpg":{"src":"../optimized/card-q-22-ece4dd31a8.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACQBACdASoVACAAPyWCvFSuKKYjKAqpwCSJaQAAJa8i485K9g12YMeumO1ZpoAA/rachnDFJnANdX60JrrvzG6KUcL61AYH5/FbB5SJ+UDXuyyTNfKfV6mnhCDVH0MVwF/Jgyq1aqzoGYAA"},"questions/q-23.jpg":{"src":"../optimized/card-q-23-3c6e40117f.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACwBACdASoVACAAPyWGvFUuKSYjKAqpwCSJaQAAJa8jDZhHxsFaI1cjdUB3DcVgAP62nIZwxSZwDXV+tCa7JJvMMfWxae+9dxMLzW3bEqt7l3g4VZhbGIBK1WQaev1N0EUFFuo9XorAAA=="},"questions/q-24.jpg":{"src":"../optimized/card-q-24-95dac7c78d.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyV+uVQuJ6WjMBgIAcAkiWkAACWvIw1x5e8oqW4rtVHH3QAA/rachnDFJnANdX60JrsqQZaDpx4S/3ee44WpFkiv5cDNSuhYj8o+v0f+USL2qxHcYWXlabrZghcAAA=="},"questions/q-25.jpg":{"src":"../optimized/card-q-25-957771698b.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADwBACdASoVACAAPyV+uVSuJ6WjMBgIAcAkiWkAACWvJcIr/aGRjpELEKDjTIvK2AAA/rachnDFJnANdX6yXgkH38W2yXecmXdQ6HZGn/yLnfg2rnvJUju2C7ghqqEibOxyI2iAAAA="},"questions/q-26.jpg":{"src":"../optimized/card-q-26-27a88456f1.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACwBACdASoVACAAPyWEvVUuKKajKAqpwCSJaQAAJa8iuIorif7hcycRYkGfOvAAAP62nIZwxSZwDXV+tCa69faaCkAjtaq74xGcXlp6HphJ8f1oAa4bSI27+BqKFOn2wzqr8u0DAAAAAA=="},"questions/q-27.jpg":{"src":"../optimized/card-q-27-92fd4816f9.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAAAQBACdASoVACAAPyWIvFWuKSYjKAqpwCSJaQAAJa8YoyzB0OC+/4tYAAD+tpyGcMUmcA11frVlJcPv6OOYBrZDjtnQMyToSXfbklHibAJC7TR/lcJL8pNzqfe2Vk6oHyqueewYVrNSMxUTQ0AAAA=="},"questions/q-28.jpg":{"src":"../optimized/card-q-28-23979e7889.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAACwBACdASoVACAAPyV8t1SuJyUjMBgIAcAkiWkAACWvJfYU3xYsC21N4+brCDWAAP62nIZwxSZwDXZtEDg2c74ObRqgI/+HatHGv11YiugTKiKEoW+i49hqA1Yx1c09S7sQAA=="},"questions/q-29.jpg":{"src":"../optimized/card-q-29-8084b35c97.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACQBACdASoVACAAPyV8uVUuJyWjMBgIAcAkiWkAACWvGKMUgaO9/FC3kyVLsrAA/rachnDFJnANdX60JsWZoqYyCkAiLLDirGPye/HX3pVaONWXkD10CZUQoxRKag5SeKmSKsVix0CQAAAA"},"questions/q-30.jpg":{"src":"../optimized/card-q-30-77b2715618.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQBACdASoVACAAPyV8uVSuJyWjMBgIAcAkiWkAACWvJiRZqUmmTq1nD30I6IAA/rachnDFJnANdm0QOg/u2JGsX8ExBV639WTXsOq0syHk/EGW3XHQpHAmjWPSbSAhrUkgUEMUAAA="},"questions/q-31.jpg":{"src":"../optimized/card-q-31-ae3b539c01.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQBACdASoVACAAPyWGvVUuKSajKAqpwCSJaQAAJa8meTHQ9fFE8q1n5glhcrgA/rachnDFJnANdX6ts7LxD+FBlL/VqPw16RG2Hv8NfO37GtXBVEGa5u1NIbDzQqcypfNnP6zxIAA="},"questions/q-32.jpg":{"src":"../optimized/card-q-32-2b286f6ea3.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyWEvVUuKKcjKAqpwCSJaQAAJa8hpHyhEzr0DEeW20/DD7AA/rachnDFJnANdX61ZR5ebkXt+P7ruylC1JdlfWduEkUiTUeXiE9srJGjRO83CnT7YZ1V+XaBgAAAAA=="},"questions/q-33.jpg":{"src":"../optimized/card-q-33-119cf36339.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyV6uVSuJyWjMBgIAcAkiWkAACWvIO4uWhTwtGlOEoetDvAA/rachnDFJnANdX61ZR08JImAEuCCHfWJtPvM+mM1W8fiutYSpv0wbRURotZVJ4qZte5bWcMHawAAAA=="},"questions/q-34.jpg":{"src":"../optimized/card-q-34-1507a76f02.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADQBACdASoVACAAPyV8uVUuJyWjMBgIAcAkiWkAACWvIvB6mZ3ZqZUOvWBTWHaYQAD+tpyGcMUmcA11frVlIi+eqS6JgY8ZH4LntLzrR0g0bCXqGUzqeXJL8rr4/Fx7DUBnVX5doGAAAA=="},"questions/q-35.jpg":{"src":"../optimized/card-q-35-d5c7e5eb85.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyV8uVQuJyWjMBgIAcAkiWkAACWvIuI+s76ojgUiOAtU6IAA/rachnDFJnANdX60Jrr19poQCdm7t+yeqOQKFg5nPWsBlh2sK42Eqb9GSo6Jj7BOEF/lddCE0UJgAA=="},"questions/q-36.jpg":{"src":"../optimized/card-q-36-5e4e7e9c88.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACwBACdASoVACAAPyWCtlOuKKSisBgIAcAkiWkAACWvIPT4gZIyYnH1JVdzlVAAAP62nIZwxSZwDXV+tWUem3aB3FD9V+i5NLn9PpSjO5m7YRt7mA37IZCOv+irPNaHSQY0IvinyAAAAA=="},"questions/q-37.jpg":{"src":"../optimized/card-q-37-955f9d6ca0.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAwBACdASoVACAAPyWEvVQuKKcjKAqpwCSJaQAAJa8l9niU+DV3VsUXuqAA/rachnDFJnANdX6r02+V3zRbriLZFNA5+h6NQTWUyjoe7N82QPajjQ7HybwILNsPk0X6SQIt2oAAAAA="},"questions/q-38.jpg":{"src":"../optimized/card-q-38-a0afdb52cb.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACwBACdASoVACAAPyWAt1QuJ6UjMBgIAcAkiWkAACWvIxCZAewd4Fnv0NhRRdlYAP62nIZwxSZwDXV+tCavzy/QczHzQbR1NmlUq91Kd9aQ+429zAb9ZILqYjX7oVOYjW4+OPO6QAA="},"questions/q-39.jpg":{"src":"../optimized/card-q-39-2815046009.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADQBACdASoVACAAPyV6uVQuJyWjMBgIAcAkiWkAACWvH30kqU29nLdH1z9RRebTgAD+tpyGcMUmcA11frVMtfqQepQESKI9q2pJxSQkjJsD5k4aVRBmokx/rTWEaAtraDw487pAAAA="},"questions/q-40.jpg":{"src":"../optimized/card-q-40-7645aef2eb.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADQBACdASoVACAAPyV6t1QuJyUjMBgIAcAkiWkAACWvIJYw0a5faamdpNcOBuMfAAD+tpyGcMUmcA11frVMsrKptwKOT2zJf94p1rOk9Nj2jMZhTVJM3k7qMkN7u8DmSSJuvhc8DaowAA=="},"questions/q-41.jpg":{"src":"../optimized/card-q-41-006ad2b7cb.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyWEvFUuKKYjKAqpwCSJaQAAJa70l3FS5OFeSrqEOCyvPAAA/rachnDFJnANdNtORoEeNkdUr2FgHYOxzYlLdES0vhw4sr7/jWjgCGZnr2OsbKqNL6Ru0OkLuYAAAA=="},"questions/q-42.jpg":{"src":"../optimized/card-q-42-91762b8fe1.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyWAt1OuKCUisBgIAcAkiWkAACWuwtmdl4cbXj/0NhRLiIAA/rachnDFJnANdYWGhNdlHEOjutyrOL/ssbobwQDBHvrSH3G3uYDfrJBdTtX8E3QRHwK78K8Z7UAAAA=="},"questions/q-43.jpg":{"src":"../optimized/card-q-43-8705d422c1.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAABQBACdASoVACAAPyWCt1QuKKUjMBgIAcAkiWkAACUnVcY36kYBPUD7B7qgAP62nIZwxSZwDXZuQE4BAZTkZkFroz9A9X6QhRfkcJIybhlwODvvRdVX4ioGz4QX+f76ETDFCYAA"},"questions/q-44.jpg":{"src":"../optimized/card-q-44-277ebef67a.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABQBACdASoVACAAPyV8uVSuJyWjMBgIAcAkiWkAACWvIOstCZJVj42V0GmgAP62nIZwxSZwDXV+tWUeM5q1UrdmJTHRt2MpdpyCa/LfOjYIigFqSZvKp9YxDa9iJVBNGcl0Uyamp4AAAA=="},"questions/q-45.jpg":{"src":"../optimized/card-q-45-e4b4319831.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADwAwCdASoVACAAPyWEvFUuKCYjKAqpwCSJaQAAJa8bVi/ggAyYENOAAP62nIZwxSZwDXV+tUy3jUG1KV208WOw4U6xDUA6Q+ykatbkak3UAGeoPBwf3rCn1epnb6Mh/t2FQTRsoNr65/fLgAA="},"questions/q-46.jpg":{"src":"../optimized/card-q-46-39d272e7de.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQBACdASoVACAAPyWCt1QuKKUjMBgIAcAkiWkAACWvJfYWjT+JqF06MH4CvFAA/rachnDFJnANdm0IdjGLluNK7g6UWUSVxhL1Jky3F1J7EFUJofKEZ/aYW3pNpAevQkINfP+AAAA="},"questions/q-47.jpg":{"src":"../optimized/card-q-47-7d47d432b3.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADQBACdASoVACAAPyWEvVUuKKcjKAqpwCSJaQAAJa8irRELR0cGMbtf5g+e+CzEAAD+tpyGcMUmcA11frQmrmV71gYYSuyTJMracxmpYkaLI2MtuuJbNo2bS/NaHSN2hz+s8SAA"},"questions/q-48.jpg":{"src":"../optimized/card-q-48-cd4ff757d9.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABwBACdASoVACAAPyV6uVUuJqWjMBgIAcAkiWkAACWvGOtm95OCi9/J8OMfAAD+tpyGcMUmcA11frVMsQycbKW28liB3wVMq1pZ5p6YzVdv0c6ZlUQZqgQA6TT4NqAHjLe/2z62EAAAAA=="},"questions/q-49.jpg":{"src":"../optimized/card-q-49-306098a83f.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyV8uVSuJyWjMBgIAcAkiWkAACWu5BsfsHfzopfsn2gH2nAA/rachnDFJnANdNtZigqD7zzM1mkWMG523sCDZYSRk2CATDrUkzeUB3mRse7bwN7uqUlRGhOgSAAAAA=="},"questions/q-50.jpg":{"src":"../optimized/card-q-50-08f9aca676.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyWEvFUuKKYjKAqpwCSJaQAAJa8h9Rly79xxo/eRwFjJBgAA/rachnDFJnANdX60JT1xD8/vLksGWrAsJ4jRkVQNe7LLndUitHAEPgDknJp7LPhBf7eGCtrZCOQAAA=="},"questions/q-51.jpg":{"src":"../optimized/card-q-51-a8cf248ca1.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADwBACdASoVACAAPyV8uVUuJyWjMBgIAcAkiWkAACWvJffCD6aGl+S/0qKDykpCRsAA/rachnDFJnANdX6r02JAD1hvehfH4M4XZgMsO05XhKm/Rj/K3Q1WE5wZb3+2d9mAAAAA"},"questions/q-52.jpg":{"src":"../optimized/card-q-52-6bb4889df4.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACwBACdASoVACAAPyV+ulUuJ6WjMBgIAcAkiWkAACWvIwpI4yO6fgnm4US4deWAAP62nIZwxSZwDXV+tWUkmftjCMKMLj7p44dfQY9ltAZzGalqERReDwsuJEBIWPdt4G93SONfP7QAAAAA"},"questions/q-53.jpg":{"src":"../optimized/card-q-53-db2aae6a0e.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyV6uVQuJyWjMBgIAcAkiWkAACWvJmmDLFLtOL94NWzp0QAA/rachnDFJnANdX6tsWSXPPNtF8vJWF0gtD99yEjSJtMi52IIlZWSLCVAz8sqk8VM2FPI6t4zFAAAAA=="},"questions/q-54.jpg":{"src":"../optimized/card-q-54-f50d72021b.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADQBACdASoVACAAPyWEvVUuKKcjKAqpwCSJaQATgAB+fRb5td8/gSlb7SxyBv13VAD+tpx3dPKTrUT26csu+YVtH8vzKV+WRTVdndreGTLYFTVXGMPTdM1pfdeeA3QKpdFMmpqeAAA="},"questions/q-55.jpg":{"src":"../optimized/card-q-55-710a1194a8.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyWEvFUuKKYjKAqpwCSJaQAAJa8i4j6vtyXV/0A+SGwnGSgA/rachnDFJnANdX61ZSSNeOYblFfRX3Mh1jETU/nrWcAzJgfFkU5E5Wf2LCmc34VBNGo/IFafB1AAAA=="},"questions/q-56.jpg":{"src":"../optimized/card-q-56-bb93e96b59.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyV+tlOuJ6SisBgIAcAkiWkAACWvIw2Bg9fgTkx21DM5XMAA/rachnDFJnANdX60JrsqQZRazySM0iGyhQHL0pMdWygQwjsyuZlH1+h7w0iOkiVQTRqTIlH6ToEgAA=="},"questions/q-57.jpg":{"src":"../optimized/card-q-57-91c41415d5.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQBACdASoVACAAPyWCuVSuKCWjMBgIAcAkiWkAACWvIw2YR7B3JeDxuDU14oAA/rachnDFJnANdX61ZSSXT6qqZAIW+gNEqNZm5SiwIEkPuNvcwG/ZDIR2Qjp+hU5m17ltZwwQAAA="},"questions/q-58.jpg":{"src":"../optimized/card-q-58-298e92d7a0.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAwBACdASoVACAAPyWAulUuJ6WjMBgIAcAkiWkAACWvH5hGT8Lz2daCCkAA/rachnDFJnANdX61TLDZRXDT09zlwCcMsFva5+i9Hatbkr5PzCsVHtGQMbIgqhM9pPnzPnDQcYRV6SeIq9AAAAA="},"questions/q-59.jpg":{"src":"../optimized/card-q-59-1e1bbb6afb.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQBACdASoVACAAPyV6uVQuJyWjMBgIAcAkiWkAACWvIwkOuAncCX2v45G3EQAA/rachnDFJnANdt9DtYB8tIZm0IIPva5s0rUm83I1AAOUplsQra1D1OfmsTWEaAtxgJli7dqAAAA="},"questions/q-60.jpg":{"src":"../optimized/card-q-60-f094939a67.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQBACdASoVACAAPyWGuVWuKKWjKAqpwCSJaQAAJa93OpcPvenIunTzVoWB0xgA/rachnDFJnANdt9eycITMp41sDmegXavVFGSR3nMFslgbXLNw2kTR5AnioLOOzGZyRu0Of1mAAA="},"questions/q-61.jpg":{"src":"../optimized/card-q-61-5be814881c.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAACQBACdASoVACAAPyWEvFUuKKYjKAqpwCSJaQAAJa8l9pWfXWzqOLOF9vDOmmgA/rachnDFJnANdX6yXfvh1/p8CkQ47epWt4a3L3BkwHT6vU06b901Byk5Iyobcyxdu1AAAA=="},"questions/q-62.jpg":{"src":"../optimized/card-q-62-0bde620d37.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADQBACdASoVACAAPyWGtlOuKaSisBgIAcAkiWkAACWvIxZ8094Oy+Hf8SP5dUjQAAD+tpyGcMUmcA1230O0zWQHJ+MfKbVzqWF8iGo07cXUnsQVQmIRs/ZMoM0UssoUyxdu1AAA"},"questions/q-63.jpg":{"src":"../optimized/card-q-63-292aee2101.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABQBACdASoVACAAPyV+uVUuJ6WjMBgIAcAkiWkAACWu9G5enwmHgWRXqYJYAP62nIZwxSZwDXTbTkZbM6Dg3xr/rfpDc9QSLiS2qP+StdmbpAN9ntXPeRTLu4JjZVRpfMvqzOYnzzAAAA=="},"questions/q-64.jpg":{"src":"../optimized/card-q-64-59960f4241.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADQBACdASoVACAAPyV+t1QuJ6UjMBgIAcAkiWkAACWvIxM48vDs0HFa/VZ/w/lc8AD+tpyGcMUmcA11frQmr9X9MMdq3HbsIracNGymq6gkZA+DwsuSeKhK06S1VCR0/KaAAgXkAAA="},"questions/q-65.jpg":{"src":"../optimized/card-q-65-eebc453aa9.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQBACdASoVACAAPyWIulYuKSWjqAqpwCSJaQAAJa7kSIC2QtFFRUsOjDaAAP62nIZwxSZwDXTbWYoKg/RA9qan8qDwLl65OktrcLNOr3zkTlYvXfVuVJ7dUqjv/zr5S450AA=="},"questions/q-66.jpg":{"src":"../optimized/card-q-66-a7656b94be.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyWEuVOuKKWisBgIAcAkiWkAACWvGK++ryskwqw2K6JA08AA/rachnDFJnANdX61ZSXDvLU1wdtAattSPWedBE4tlm+dGaF97mA37NPzd1VY2YG93Iti0ed0OgAAAA=="},"questions/q-67.jpg":{"src":"../optimized/card-q-67-a7899c16c7.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADQBACdASoVACAAPyWCtlOuKKSisBgIAcAkiWkAACWvIcU2posypZuHV3E4NZMhoAD+tpyGcMUmcA11frQlSizAJ6ulqqGBBPAmJkR22qkBbOANXGTNbjvkfqsJ2zotUGD1h3jIAAA="},"questions/q-68.jpg":{"src":"../optimized/card-q-68-c31e4e4b3d.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADQBACdASoVACAAPyV+tlOuJ6SisBgIAcAkiWkAACWvJewkF6oV70ViQGabVg5WXAD+tpyGcMUmcA11frSzmB7FpxAQmxF54gtE1g7bVRGTqcSiEXIycblMZaX5rQ6SEWUI2CFwAAA="},"questions/q-69.jpg":{"src":"../optimized/card-q-69-fc67df855e.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAACwBACdASoVACAAPyWCtlKuKKUisAgBwCSJaQAASl5DOzBiOk5JV81fg9nlhsAAAP62nIZwxSZwDXV+tWUd3JVetKfMSfdHrAUxBbwdN4xVnolDW9EuiIxWYag9GKsSRRAAAA=="},"questions/q-70.jpg":{"src":"../optimized/card-q-70-7479607c28.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABwBACdASoVACAAPyV+uVUuJ6WjMBgIAcAkiWkAACWvIS31LtINkp/SBlHOcAD+tpyGcMUmcA11frVlIm4SEsKVsy0wm6SqxfrILZUEJIybjT+z2rnvJD24XKQBFVRpfSONfPrYZwAAAA=="},"questions/q-71.jpg":{"src":"../optimized/card-q-71-982f0c32e7.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADQBACdASoVACAAPyWEvVWuKCajKAqpwCSJaQAAJa8mGCUhCmT4oWhAqett+BPUSAD+tpyGcMUmcA11fqvtnR/YxagKBmdDCbDLkMcx5T5JyoiLXzNxx2aKWYmfwjNJwAAAAA=="},"questions/q-72.jpg":{"src":"../optimized/card-q-72-2bfbe7256e.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACwBACdASoVACAAPyWEu1UuKKYjKAqpwCSJaQAAJa8V2yFshX8SK/9bJD8VIKQAAP62nIZwxSZwDXV+tCbEUxYymFOPCX++IzcmXh3qZ6g8BHf/K9srJzQMTh/4Jugil/IyI+gAAAA="},"questions/q-73.jpg":{"src":"../optimized/card-q-73-3be1deab70.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAwBACdASoVACAAPyWEu1UuKKYjKAqpwCSJaQAAJa8Y62bw6TEfpm3Vxj4A/rachnDFJnANdX61TLA8493y9M/NBKnbW1ZkubleroDUNV3BWU5E5WfytiwQa/dAx8fgnwRNDQAAAAA="},"questions/q-74.jpg":{"src":"../optimized/card-q-74-a55228c547.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADQBACdASoVACAAPyWAuVUuJ6WjMBgIAcAkiWkAACWvIw2YR6+i9GB5lXIRx9OH9AD+tpyGcMUmcA11frVlJJdPlJdEwS0wjzW4FC09lqK+dIH9PsHfeilvcwECQ0Ha+j8M0/ow0AAAAA=="},"questions/q-75.jpg":{"src":"../optimized/card-q-75-f796366dbb.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACwBACdASoVACAAPyWEu1SuKKYjKAqpwCSJaQAAJa8fceyzG8cH0dwH3NdWx9kAAP62nIZwxSZwDXV+tUzMV2caoKdO0v1UhmMa7uTq3uXUdR4nFe0kNmdstjuwqCaNfh4Rmk4AAAA="},"questions/q-76.jpg":{"src":"../optimized/card-q-76-5f438fc54f.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACwBACdASoVACAAPyV6uVUuJqWjMBgIAcAkiWkAACWvIriKMTTfF/F/ywkKGoWgAP62nIZwxSZwDXV+tWUkjDyGhdEwaTrrYmN4mI67HhrcV0LU2m4bSI3TdRffXYMNQGdQURJZRcgAAA=="},"questions/q-77.jpg":{"src":"../optimized/card-q-77-1022b041f4.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAACQBACdASoVACAAPyV8t1QuJyUjMBgIAcAkiWkAACWvd6gFtE3ngcS8pd2ZLTgA/rachnDFJnANdM7BttkhOGbIupWKWWWLhBo1/9fSFbWoR4Yq3xVnmtDkWxaPO6HQAAA="},"questions/q-78.jpg":{"src":"../optimized/card-q-78-b0454980a3.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACQBACdASoVACAAPyV+t1QuJ6UjMBgIAcAkiWkAACWvHMp9bM4jm4PQ2fmykfAA/rachnDFJnANdX60JsGRGhfFGPcVhpS+0IsVSFfOjO9PB1EIuRk42vnnMVwF/GYw2uhzsoAA"},"questions/q-79.jpg":{"src":"../optimized/card-q-79-787082f157.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADQBACdASoVACAAPyWCt1OuKKUisBgIAcAkiWkAACWvEjYmZW3eNqjkWFzDJcEiAAD+tpyGcMUmcA11fqvhWcn11Vr94QDatLMlvwLTWS38eeq+OzaX5rQ6F7r65/fLgAA="},"questions/q-80.jpg":{"src":"../optimized/card-q-80-c6d13b6855.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACwBACdASoVACAAPyWEt1QuKKUjMBgIAcAkiWkAACWvJxzG87mt/B6whbHeMJTwAP62nIZwxSZwDXV+mJfCvIY8/9GQGvytrItIFCSMm4ZcDg770Ut7l1W/8JN0ER7tUSWUXs6AAAA="},"questions/q-81.jpg":{"src":"../optimized/card-q-81-46ff506f4a.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAABwBACdASoVACAAPyWAt1QuJ6UjMBgIAcAkiWkAACWvAQMdpRLiNPzTfxZxEAD+tpyGcMUmcA10y4BVjHEbGTH/YdLY8IU5ORk7oe0b1HFCxe7Gnu2UHf57BhqAzqNQk6JAvUAA"},"questions/q-82.jpg":{"src":"../optimized/card-q-82-886d3ec250.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACwBACdASoVACAAPyWEu1UuKKYjKAqpwCSJaQAAJa8jDEU39s9X2daP2lgnDCxMAP62nIZwxSZwDXV+tWUklBFxuUV5tzpx2oB3US6FMdRz1JMIMge1JnnuzpB+E1GYsv6D/Rhr+gAAAA=="},"questions/q-83.jpg":{"src":"../optimized/card-q-83-c29529beb4.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADQBACdASoVACAAPyWEtlOuKSUisBgIAcAkiWkAACWvJaJ9tesZfUjvr1xdCpZqAAD+tpyGcMUmcA11frGmJDArrq9f5JmLNPBO5m9IJa9zAb9ZILq1FCnT7YZ1mpbABdDoAAAA"},"questions/q-84.jpg":{"src":"../optimized/card-q-84-081e571370.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAABQBACdASoVACAAPyWGvVUuKSajKAqpwCSJaQAAJa8dqEFkcF+QTSNQGDTQAP62nIZwxSZwDXV+tUyIoFsTD2icWMnWiG4ql1fZpD3wvkvb5JyoY4rchO3KZP+sY6Qnrb0mM8AA"},"questions/q-85.jpg":{"src":"../optimized/card-q-85-98ee34d094.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAABwBACdASoVACAAPyV8t1QuJyUjMBgIAcAkiWkAACWuwqcFRpb9dVjSXnKWAAD+tpyGcMUmcA11hYaspEdJcPoZRP7V0k+aR0ilb/IKvmjCx43v01LX9qOOvW2Lfg/EaAuEnKF2AC6IGQAA"},"questions/q-86.jpg":{"src":"../optimized/card-q-86-d7441a8e5f.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwBACdASoVACAAPyV+uVSuJ6WjMBgIAcAkiWkAACWvJlnj7V6fwItHKy8obQLhSwAA/rachnDFJnANdX6ttP/r9S4ANZa4X6+N4+p6kAaf/GR9W7e5h1E9Ix35yHPWgEB7ArxFXoAAAA=="},"questions/q-87.jpg":{"src":"../optimized/card-q-87-78d90ce1b2.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACwBACdASoVACAAPyV+t1UuJ6UjMBgIAcAkiWkAACWuw0TvzqMjDH4KXLilQ7wAAP62nIZwxSZwDXWFhoTVugCzK5XdvuVeeDMZzDTp1aONxdZsogrQNGYGfhkxF7dx+uHwsRV6AAAAAA=="},"questions/q-88.jpg":{"src":"../optimized/card-q-88-cff5455fbd.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAABwBACdASoVACAAPyV8uVSuJyWjMBgIAcAkiWkAACWvHrjQcZIqB3CBCwAuqAD+tpyGcMUmcA11frQmxZe4hJ0u7tWdSExiimsMmwFRq0caAXjzNnU8uTIkcv0i+xEqgmjOS6KZNTU8AAAA"},"questions/q-89.jpg":{"src":"../optimized/card-q-89-c04edd61dd.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABwBACdASoVACAAPyV6uVQuJyWjMBgIAcAkiWkAACWvIsbowTkWF3Wxo2hrAAD+tpyGcMUmcA11frQmux886k11P9GNosW3w6ItttaBDCGOYdmVRBmtKnQmnwbUApBUexLmnqXbAAA="},"questions/q-90.jpg":{"src":"../optimized/card-q-90-8712b80566.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADQBACdASoVACAAPyV6t1UuJyUjMBgIAcAkiWkAACWvJSGgs/QaI+1i8t4sFaWVMAD+tpyGcMUmcA11frQmmQpUIcl1NMKkpuslHd5IyyWBNaXyTlQMqjp71WE3dW+V+2fWwrxAAAA="},"questions/q-91.jpg":{"src":"../optimized/card-q-91-4c0085d76d.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQBACdASoVACAAPyWCtlMuKKUisBgIAcAkiWkAACWvHaxUXL6X1M9PDYTJGnAA/rachnDFJnANdX61TLUJsueKnnuJb/MsHJCYZ47A1s3thKivTkldX9DRLGTQoMzFbG87DCfd7gAAAA=="},"questions/q-92.jpg":{"src":"../optimized/card-q-92-8c3381fe78.webp","w":746,"h":1125,"preview":"data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQBACdASoVACAAPyWEvVWuKCajKAqpwCSJaQAAJa8jJtdZ2fDAWWEXUwhDBqAA/rachnDFJnANdX60JrrvXHQ8korLneoS/zI2u584Ie7Iia0xh6uZgFKi3re81odI3aHP6zxIAAA="}};
  const cardImage = (file, alt) => {
    const item = cardImages[file];
    if (!item) return `<img src="${assets}/${file}" alt="${escapeHtml(alt)}" loading="lazy" />`;
    return `<img src="${assets}/${item.src}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" width="${item.w}" height="${item.h}" data-image-preview="${item.preview}" />`;
  };
  const pad = (value) => String(value).padStart(2, '0');

  const copy = lang === 'zh' ? {
    title: '卡牌圖鑑',
    intro: '這套卡牌把網絡中的判斷方式帶到桌面：標籤卡定義群體如何描述一個人，提問卡把日常分歧變成可以繼續討論的入口。',
    coreTitle: '核心標籤',
    extensionTitle: '拓展標籤',
    questionsTitle: '提問卡',
    core: '核心',
    extension: '拓展',
    featured: '主卡',
    hoverHint: '懸停查看翻譯',
    questionAlt: '實體提問卡'
  } : {
    title: 'Card atlas',
    intro: 'The deck brings online judgment to the table: identity labels describe how a group reads a person, while question cards turn everyday disagreement into a reason to keep talking.',
    coreTitle: 'Core labels',
    extensionTitle: 'Extension labels',
    questionsTitle: 'Question cards',
    core: 'CORE',
    extension: 'EXTENSION',
    featured: 'FEATURED',
    hoverHint: 'Hover for translation',
    questionAlt: 'Printed question card'
  };

  const labels = {
    core: [
      { name: '槓精', enName: 'Argument picker', file: 'label-gangjing.jpg', color: '#E51C23', slogan: '你是故意來找茬的是不是', enSlogan: 'You came here just to pick a fight, didn’t you?', desc: '挑剔細節，抬槓至上，為反對而反對', enDesc: 'Finds faults in details and argues for the sake of arguing.' },
      { name: '擺爛人', enName: 'The checked-out one', file: 'label-bailan.jpg', color: '#F57C00', slogan: '算了，愛咋咋地……', enSlogan: 'Whatever. Let it be.', desc: '拒絕內卷，徹底躺平放棄抵抗', enDesc: 'Rejects the grind, gives up, and lets things slide.' },
      { name: '複讀機', enName: 'The repeater', file: 'label-fuduji.jpg', color: '#FBC02D', slogan: '大家都這麼說', enSlogan: 'That’s what everyone says.', desc: '人雲亦雲，重複流行說法或現成答案', enDesc: 'Repeats popular phrases or echoes the answer already in the room.' },
      { name: '騎牆派', enName: 'The fence-sitter', file: 'label-qiqiang.jpg', color: '#2EAD5B', slogan: '兩邊都有道理，先看看', enSlogan: 'Both sides make sense. Let me wait and see.', desc: '端水看風向，不願給出明確立場', enDesc: 'Keeps both sides in play and withholds a clear position.' },
      { name: '鍵盤俠', enName: 'The keyboard expert', file: 'label-jianpanxia.jpg', color: '#1E90FF', slogan: '沒做過，但我會教你', enSlogan: 'I’ve never done it, but I can teach you.', desc: '缺少親身經驗，卻積極遠程指導', enDesc: 'Gives confident remote advice without direct experience.' },
      { name: '樂子人', enName: 'The spectator', file: 'label-leziren.jpg', color: '#8E44AD', slogan: '別急，讓我先笑會兒', enSlogan: 'Don’t rush. Let me enjoy this first.', desc: '圍觀、玩梗、拱火，把衝突當作娛樂材料', enDesc: 'Treats conflict as entertainment and enjoys watching it escalate.' }
    ],
    extension: [
      { name: '老實人', enName: 'The literal one', file: 'label-laoshiren.jpg', color: '#AFDD23', slogan: '我真的只吃了一碗粉', enSlogan: 'I really only ate one bowl of noodles.', desc: '字面理解，耿直回答，常常無辜背鍋', enDesc: 'Takes words literally and answers too earnestly.' },
      { name: '洗地工', enName: 'The apologist', file: 'label-xidigong.jpg', color: '#03786F', slogan: '這都是有原因的', enSlogan: 'There must be a reason for all this.', desc: '替某方辯護，淡化責任並尋找合理化解釋', enDesc: 'Rationalizes a problem and defends the responsible side.' },
      { name: '二極管', enName: 'The binary thinker', file: 'label-erjiguan.jpg', color: '#89ABE3', slogan: '非黑即白，別繞彎子', enSlogan: 'It’s either black or white.', desc: '非此即彼，只接受兩個對立的極端', enDesc: 'Reduces an issue to two opposing extremes.' },
      { name: '三觀黨', enName: 'The moral judge', file: 'label-sanguandang.jpg', color: '#3949AB', slogan: '這不是小事，是道德問題', enSlogan: 'This is not a small matter. It is a moral issue.', desc: '把具體問題上升到人品、道德或價值觀', enDesc: 'Turns a specific issue into a judgment of character or values.' },
      { name: '懂王', enName: 'The know-it-all', file: 'label-dongwang.jpg', color: '#E53C8D', slogan: '這事我門兒清，聽我的', enSlogan: 'I know exactly how this works. Listen to me.', desc: '無論是否了解，都以專家姿態自信下結論', enDesc: 'Speaks with certainty as if no one understands the issue better.' }
    ]
  };

  const coreDescriptions = [{"zh":"抓住措辭、細節或例外不斷反駁，讓話題從原本的問題轉向“你的說法哪裡不成立”。在遊戲中，判斷的重點是反駁是否成為目的本身；提出有依據的不同意見，並不自動等於槓精。","en":"Picks at wording, details, or exceptions until the discussion shifts to what is wrong with someone else’s statement. The distinction is whether contradiction becomes an end in itself: a reasoned disagreement does not automatically earn this label."},{"zh":"面對壓力、競爭或麻煩，選擇不再投入，常以“隨便”“算了”結束討論。這種回答可能是對無效競爭的拒絕，也可能是逃避責任；群體需要從具體語境判斷這句話表達的是哪一種態度。","en":"Responds to pressure, competition, or inconvenience by withdrawing effort, often ending with “whatever.” This may reject pointless competition or avoid responsibility. The same words invite different judgments depending on the situation."},{"zh":"借用前一位玩家的答案、流行套話或多數人的說法，讓自己的表達與群體保持一致。標籤指向的是重複和附和的表達方式；即使結論相同，獨立提出理由也可能帶來不同的判斷。","en":"Borrows a previous player’s answer, a familiar slogan, or the majority view. The label concerns repetition and agreement as a way of speaking. Reaching the same conclusion with independent reasons may lead the table to a different reading."},{"zh":"同時承認兩邊的理由，推遲表態或隨局勢變化調整立場。其趣味來自審慎權衡與迴避承諾之間的模糊地帶：一句“看情況”，究竟是在補充條件，還是不願承擔選擇的後果？","en":"Acknowledges both sides, postpones a position, or shifts with circumstances. The ambiguity lies between careful judgment and avoiding commitment: does “it depends” add a meaningful condition, or sidestep the consequences of choosing?"},{"zh":"站在場外提出自信的指導和看似簡單的解決辦法，卻較少考慮實際經驗、成本與限制。與專挑漏洞的槓精不同，鍵盤俠更傾向於告訴別人“你應該怎麼做”，讓建議與行動之間的距離成為討論對象。","en":"Offers confident advice from the sidelines while overlooking practical experience, costs, and constraints. Unlike the argument picker, this voice focuses on telling others what to do. The gap between easy advice and difficult action becomes part of the discussion."},{"zh":"把事件當作可以圍觀、玩梗或製造戲劇性的材料，優先追求有趣的反應。玩家可能用幽默緩和氣氛，也可能故意拱火；群體判斷的是這句話在推動解決問題，還是讓場面更熱鬧。","en":"Treats an event as material for jokes, spectacle, or a dramatic reaction. Humor may ease tension or deliberately escalate it. The table decides whether the answer helps resolve the issue or mainly makes it more entertaining."}];
  labels.core.forEach((label, index) => {
    label.desc = coreDescriptions[index].zh;
    label.enDesc = coreDescriptions[index].en;
  });

  const categories = [
    { id: 'everyday', zh: '網絡與日常邊界', en: 'Online and everyday boundaries', zhDesc: '數字禮儀、隱私、觀看與表達。', enDesc: 'Digital etiquette, privacy, watching, and expression.' },
    { id: 'relations', zh: '朋友、親密關係與家庭', en: 'Friends, intimacy, and family', zhDesc: '關係邊界、虧欠、信任與嫉妒。', enDesc: 'Boundaries, obligation, trust, and jealousy.' },
    { id: 'work', zh: '職場、學校與合作', en: 'Work, school, and collaboration', zhDesc: '權力、責任、功勞、規則與公平。', enDesc: 'Power, responsibility, credit, rules, and fairness.' },
    { id: 'ethics', zh: '金錢、公共規則與倫理', en: 'Money, public rules, and ethics', zhDesc: '資源分配、公共秩序、手段與正當性。', enDesc: 'Resources, public order, means, and legitimacy.' },
    { id: 'identity', zh: '虛幻、身份與技術', en: 'Fiction, identity, and technology', zhDesc: '記憶、複製、讀心、算法與家庭秘密。', enDesc: 'Memory, copies, mind-reading, algorithms, and family secrets.' }
  ];

  const questionRows = [
    ['everyday', '下班後工作群消息要回嗎？', 'Should you reply to work-group messages after work?'],
    ['everyday', '只看剪輯，算看過一部劇嗎？', 'Does watching only the clips count as having watched a series?'],
    ['everyday', '朋友圈不點讚，算不重視嗎？', 'Does not liking a friend’s post mean you do not care?'],
    ['everyday', '前任點讚要回讚嗎？', 'Should you like an ex’s post back?'],
    ['everyday', '截圖聊天要不要打碼？', 'Should chat screenshots be redacted?'],
    ['everyday', '熱鬧就等於關係好嗎？', 'Does a lively social life mean a good relationship?'],
    ['everyday', '空調優先顧怕冷還是怕熱？', 'Should the AC accommodate the person who feels cold or the one who feels hot?'],
    ['everyday', '三天可見要解釋嗎？', 'Do you need to explain setting posts visible for only three days?'],
    ['everyday', '朋友圈屏蔽朋友要說嗎？', 'Should you tell a friend if you hide your posts from them?'],
    ['everyday', '刪除聊天記錄算心虛嗎？', 'Does deleting chat history make you look guilty?'],
    ['everyday', '發動態要先問同框人嗎？', 'Should you ask people in a photo before posting it?'],
    ['everyday', '網上吵架要不要講道理？', 'Should you reason with someone in an online argument?'],
    ['everyday', '私信已讀不回算冷淡嗎？', 'Is leaving a direct message on read a sign of indifference?'],
    ['everyday', '會議必須開攝像頭嗎？', 'Should cameras be mandatory in meetings?'],
    ['everyday', '吃飯看手機算失禮嗎？', 'Is looking at your phone while eating rude?'],
    ['everyday', '追劇要不要開倍速？', 'Should you watch a series at accelerated speed?'],
    ['everyday', '網購評價要寫實話嗎？', 'Should online shopping reviews tell the full truth?'],
    ['relations', '朋友吐槽伴侶該勸還是罵？', 'When a friend complains about their partner, should you advise them or curse the partner?'],
    ['relations', '朋友遲到要不要先開飯？', 'Should you start eating before a late friend arrives?'],
    ['relations', '朋友請客要搶著買單嗎？', 'When a friend is treating, should you fight to pay?'],
    ['relations', '朋友失戀要一直陪嗎？', 'Should you stay with a friend through a breakup?'],
    ['relations', '朋友臨時放鴿子要原諒嗎？', 'Should you forgive a friend for canceling at the last minute?'],
    ['relations', '朋友吐槽同事要附和嗎？', 'Should you agree when a friend complains about a colleague?'],
    ['relations', '朋友總遲到要直接說嗎？', 'Should you directly call out a friend who is always late?'],
    ['relations', '禮物不喜歡要表現嗎？', 'Should you show it when you dislike a gift?'],
    ['relations', '朋友請教問題要免費幫嗎？', 'Should you help a friend for free when they ask for advice?'],
    ['relations', '關係淡了要主動聯繫嗎？', 'Should you reach out when a relationship starts to fade?'],
    ['relations', '做客空手去合適嗎？', 'Is it acceptable to visit someone empty-handed?'],
    ['relations', '朋友唱歌跑調要提醒嗎？', 'Should you tell a friend when they sing off-key?'],
    ['relations', '桌遊輸了要請客嗎？', 'Should the loser of a tabletop game buy the next round?'],
    ['relations', '伴侶手機要不要互看？', 'Should partners look through each other’s phones?'],
    ['relations', '伴侶晚回家要報備嗎？', 'Should a partner report in when coming home late?'],
    ['relations', '伴侶生氣要馬上哄嗎？', 'Should you comfort a partner immediately when they are angry?'],
    ['relations', '室友作息不同要遷就嗎？', 'Should roommates accommodate different schedules?'],
    ['relations', '室友帶朋友回家要先說嗎？', 'Should a roommate give notice before bringing friends home?'],
    ['relations', '親密關係要共享定位嗎？', 'Should intimate partners share their locations?'],
    ['relations', '對象堅持月供占一半收入，日子怎麼過？', 'How do you live with a partner who insists on spending half their income on monthly payments?'],
    ['relations', '朋友之間容得下嫉妒嗎？', 'Can friendship make room for jealousy?'],
    ['relations', '父母的付出需要子女償還嗎？', 'Do children have to repay what their parents have given them?'],
    ['relations', '忘記傷害等於真正原諒嗎？', 'Does forgetting a hurt mean truly forgiving?'],
    ['work', '認真但做得慢算拖後腿嗎？', 'Does being careful but slow count as holding the team back?'],
    ['work', '加班的人該公開表揚嗎？', 'Should people who work overtime be praised publicly?'],
    ['work', '上班摸魚算休息嗎？', 'Does slacking off at work count as taking a break?'],
    ['work', '領導發語音要秒回嗎？', 'Do you have to reply instantly when your boss sends a voice message?'],
    ['work', '工作成果看過程還是結果？', 'Should work be judged by process or result?'],
    ['work', '任務分工要平均嗎？', 'Should tasks be divided equally?'],
    ['work', '臨時任務可以拒絕嗎？', 'Can you refuse an unexpected task?'],
    ['work', '工作慢但少錯更好嗎？', 'Is it better to work slowly and make fewer mistakes?'],
    ['work', '公共冰箱過期誰處理？', 'Who should deal with expired food in a shared fridge?'],
    ['work', '領導說吃完這頓飯就升職，你怎麼辦？', 'Your boss says you will be promoted after this meal. What do you do?'],
    ['work', '同事不肯留下文字記錄，這活怎麼接？', 'A colleague refuses to leave a written record. How do you take on the work?'],
    ['work', '結果正確能原諒手段錯誤嗎？', 'Can a correct result excuse the wrong means?'],
    ['work', '領導的錯誤決定也該執行嗎？', 'Should you carry out a boss’s wrong decision anyway?'],
    ['work', '業績達標能原諒違規操作嗎？', 'Can meeting performance targets excuse rule-breaking?'],
    ['work', '違反校規做好事該受罰嗎？', 'Should someone be punished for doing good by breaking school rules?'],
    ['work', '舉報同事算背叛團隊嗎？', 'Is reporting a colleague a betrayal of the team?'],
    ['work', '加班能證明工作態度嗎？', 'Can overtime prove a good work attitude?'],
    ['work', '小組作業該讓所有人同分嗎？', 'Should everyone get the same score for group work?'],
    ['work', '領導公開員工失誤，算管理還是羞辱？', 'Is publicly exposing an employee’s mistake management or humiliation?'],
    ['work', '團隊靠一人加班，功勞該如何分？', 'When a team relies on one person working overtime, how should credit be divided?'],
    ['work', '老師按成績排座位，算公平嗎？', 'Is seating students by grades fair?'],
    ['work', '同事靠關係升職，能力還有意義嗎？', 'If a colleague is promoted through connections, does ability still matter?'],
    ['ethics', 'AA制真的最公平嗎？', 'Is splitting the bill really the fairest option?'],
    ['ethics', '朋友借錢要寫欠條嗎？', 'Should friends write an IOU when lending money?'],
    ['ethics', '公交讓座要看年齡嗎？', 'Should giving up a bus seat depend on age?'],
    ['ethics', '外賣少送東西要投訴嗎？', 'Should you complain when a delivery order is missing something?'],
    ['ethics', '鄰居把你的車位砌成花壇，怎麼辦？', 'What do you do if a neighbor turns your parking space into a flower bed?'],
    ['ethics', '買了頭等艙卻被塞進經濟艙，怎麼辦？', 'What do you do if you paid for first class but are placed in economy?'],
    ['ethics', '你發現朋友的餐館後廚很髒，怎麼辦？', 'What do you do if you discover your friend’s restaurant kitchen is filthy?'],
    ['ethics', '體面的謊言可以被接受嗎？', 'Can a well-intentioned lie be accepted?'],
    ['ethics', '真相和安慰，哪個更接近善意？', 'Which is closer to kindness: truth or comfort?'],
    ['ethics', '服從規則等於認同規則嗎？', 'Does obeying a rule mean you agree with it?'],
    ['ethics', '合法的事一定正當嗎？', 'Is everything legal necessarily right?'],
    ['ethics', '懲罰能真正修復傷害嗎？', 'Can punishment truly repair harm?'],
    ['ethics', '外貌優勢算不算一種特權？', 'Does an appearance advantage count as a privilege?'],
    ['ethics', '冒犯感能成為禁言理由嗎？', 'Can feeling offended be a reason to silence someone?'],
    ['ethics', '熟人插隊，關係能讓規則讓步嗎？', 'If an acquaintance cuts the line, should relationships make room around the rules?'],
    ['ethics', '拍下不文明行為算侵犯隱私嗎？', 'Is filming uncivil behavior an invasion of privacy?'],
    ['identity', '三十歲重讀本科，原來的生活怎麼安置？', 'At thirty, how do you make room for life while starting a bachelor’s degree again?'],
    ['identity', '你一夜爆紅，網友開始人肉你，怎麼辦？', 'You become famous overnight and strangers start doxxing you. What do you do?'],
    ['identity', '人人都能讀心，關係會更真實嗎？', 'If everyone could read minds, would relationships become more genuine?'],
    ['identity', '擁有原主記憶的複製人，還是本人嗎？', 'Is a copy with the original person’s memories still the same person?'],
    ['identity', '愛情可以購買，還能證明真心嗎？', 'If love could be bought, could it still prove sincerity?'],
    ['identity', '過去的錯誤能定義一個人嗎？', 'Can a person’s past mistakes define them?'],
    ['identity', '偽裝久了會變成真實嗎？', 'Can a disguise become real if you wear it long enough?'],
    ['identity', '便利值得交換多少隱私？', 'How much privacy is convenience worth?'],
    ['identity', '算法比人更適合做決定嗎？', 'Are algorithms better suited than people to make decisions?'],
    ['identity', '被機器了解算不算被理解？', 'Does being known by a machine count as being understood?'],
    ['identity', '被保護和被控制如何區分？', 'How do you tell protection from control?'],
    ['identity', '保護秘密也可能是一種背叛嗎？', 'Can protecting a secret also be a form of betrayal?'],
    ['identity', '家庭秘密需要向下一代公開嗎？', 'Do family secrets need to be disclosed to the next generation?'],
    ['identity', '匿名發言需要承擔同等責任嗎？', 'Should anonymous speech carry the same responsibility?']
  ];
  const questions = questionRows.map(([category, zh, en], index) => ({ number: index + 1, category, zh, en }));

  const labelCard = (label, isCore) => {
    const name = lang === 'zh' ? label.name : label.enName;
    const slogan = lang === 'zh' ? label.slogan : label.enSlogan;
    const desc = lang === 'zh' ? label.desc : label.enDesc;
    const alt = `${name} ${lang === 'zh' ? '標籤卡' : 'identity label card'}`;
    return `
      <article class="label-atlas-card ${isCore ? 'label-atlas-card-core' : 'label-atlas-card-extension'}" style="--label-color: ${label.color}">
        <figure class="label-atlas-media">
          <div class="atlas-card-mask">${cardImage(`labels/${label.file}`, alt)}</div>
          <figcaption>${isCore ? copy.core : copy.extension}</figcaption>
        </figure>
        <div class="label-atlas-copy">
          <h4>${escapeHtml(name)}</h4>
          <p class="label-atlas-slogan">${escapeHtml(slogan)}</p>
          <p>${escapeHtml(desc)}</p>
        </div>
      </article>`;
  };

  const questionCard = (question, featured = false) => {
    const number = pad(question.number);
    const category = categories.find((item) => item.id === question.category);
    const categoryName = lang === 'zh' ? category.zh : category.en;
    const aria = `${copy.questionAlt} ${number}, ${categoryName}. ${question.en}`;
    return `
      <figure class="question-card-atlas-item ${featured ? 'question-card-atlas-item-featured' : ''}" tabindex="0" aria-label="${escapeHtml(aria)}">
        <div class="question-card-atlas-visual">
          ${cardImage(`questions/q-${number}.jpg`, `${copy.questionAlt} ${number}`)}
          <span class="question-card-atlas-translation">${escapeHtml(question.en)}</span>
        </div>
        <figcaption><span>Q${number}</span><span class="question-card-atlas-hint">${copy.hoverHint}</span></figcaption>
      </figure>`;
  };

  const questionCategory = (category, index) => {
    const group = questions.filter((question) => question.category === category.id);
    const name = lang === 'zh' ? category.zh : category.en;
    const desc = lang === 'zh' ? category.zhDesc : category.enDesc;
    return `
      <section class="question-atlas-category">
        <div class="question-atlas-category-heading">
          <div>
            <p class="question-atlas-category-index">${pad(index + 1)} / ${escapeHtml(copy.questionsTitle)}</p>
            <h4>${escapeHtml(name)}</h4>
            <p>${escapeHtml(desc)}</p>
          </div>
        </div>
        <div class="question-atlas-category-layout">
          <div class="question-atlas-featured">
            ${questionCard(group[0], true)}
          </div>
          <div class="question-atlas-array">
            ${group.slice(1).map((question) => questionCard(question)).join('')}
          </div>
        </div>
      </section>`;
  };

  root.innerHTML = `
    <div class="card-atlas-intro">
      <h2 class="section-heading">${copy.title}</h2>
      <p>${escapeHtml(copy.intro)}</p>
    </div>
    <section class="label-atlas-block">
      <div class="card-atlas-block-heading">
        <h3>${copy.coreTitle}</h3>
      </div>
      <div class="label-atlas-grid label-atlas-grid-core">
        ${labels.core.map((label) => labelCard(label, true)).join('')}
      </div>
    </section>
    <section class="label-atlas-block label-atlas-extension-block">
      <div class="card-atlas-block-heading">
        <h3>${copy.extensionTitle}</h3>
      </div>
      <div class="label-atlas-grid label-atlas-grid-extension">
        ${labels.extension.map((label) => labelCard(label, false)).join('')}
      </div>
    </section>
    <section class="question-atlas-block">
      <div class="card-atlas-block-heading">
        <h3>${copy.questionsTitle}</h3>
      </div>
      <div class="question-atlas-categories">
        ${categories.map((category, index) => questionCategory(category, index)).join('')}
      </div>
    </section>`;
})();
