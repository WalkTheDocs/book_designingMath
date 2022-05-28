import os
from string import Template
from typing import List, Union

HTML_UL = Template('<ul>$content</ul>')
HTML_LI = Template('<li>$content</li>')
HTML_LINK = Template('<a href="./$chapter/$ch/index.html">$ch</a>')


def wrapWith(tag: str, children: Union[List[str], str]) -> str:
    if isinstance(children, list):
        output = f'<{tag}>'
        for child in children:
            output += child
        output += f'</{tag}>'
    else:
        output = f'<{tag}>{children}</{tag}>'
    return output


def main():
    """
    ファイル構成によって、トップディレクトリのindex.htmlを自動生成する
    """

    chapter_dirs = [d for d in os.listdir('.') if d.startswith('Chapter')]
    chapter_dirs.sort()

    for chapter_dir in chapter_dirs:
        ch_dirs = [d for d in os.listdir(chapter_dir)
                   if not d.startswith('.') and d != 'exercises']
        ch_dirs.sort()

        links = [HTML_LINK.substitute(
            chapter=chapter_dir, ch=ch_dir) for ch_dir in ch_dirs]
        list_items = [wrapWith('li', link) for link in links]
        ul = wrapWith('ul', list_items)
        print(ul)
        break


if __name__ == '__main__':
    main()
