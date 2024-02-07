<?php
// src/Controller/MainController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Notifier\TexterInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;

class MainController extends AbstractController
{
    #[Route('/', 'index')]
    public function index(Request $request): Response {
        return $this->render('base.html.twig');
    }

    #[Route('dashboard', 'dashboard')]
    public function dashboard(Request $request): Response {
        return $this->render('dashboard.html.twig');
    }
}