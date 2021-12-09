<?php

namespace Giantpeach\CustomStyles;

use Statamic\Fieldtypes\Bard\Augmentor;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{

    protected $scripts = [
        __DIR__ . '/../dist/js/custom-styles.js',
    ];

    protected $stylesheets = [
        __DIR__ . '/../dist/css/custom-styles.css'
    ];


    public function bootAddon()
    {
        parent::boot();
        Augmentor::addMark(CustomStyles::class);
    }
}
