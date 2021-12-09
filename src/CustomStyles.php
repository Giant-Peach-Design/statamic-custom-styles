<?php

namespace Giantpeach\CustomStyles;


use ProseMirrorToHtml\Marks\Mark;

class CustomStyles extends Mark
{
    protected $markType = 'customStylesClassType';
    protected $tagName = 'span';

    public function matching(): bool
    {
        return $this->mark->type === $this->markType;
    }

    public function tag(): ?array
    {
        return [
            [
                'tag'   => $this->tagName,
                'attrs' => [
                    'class' => 'custom-styles ' . implode(" ", $this->mark->attrs->key)
                ],
            ],
        ];
    }
}
