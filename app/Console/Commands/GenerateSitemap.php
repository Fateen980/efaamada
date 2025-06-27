<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Spatie\Sitemap\Sitemap;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sitemap = Sitemap::create();

        $sitemap->add('/');
        $sitemap->add('/efaa');
        $sitemap->add('/info');
        $sitemap->add('/about-us');
        $sitemap->add('/efaa');
        $sitemap->add('/manasa');
        $sitemap->add('/steps');
        


        $sitemap->writeToFile(public_path('sitemap.xml'));

    }
}
