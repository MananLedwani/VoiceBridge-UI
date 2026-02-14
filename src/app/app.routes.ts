import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login-signup/login-signup.component').then((c) => c.LoginSignupComponent),
    },
    {
        path: 'home',
        loadComponent: () => import('./components/layout/layout.component').then((c) => c.LayoutComponent),
        children: [
            {
                path: 'text-to-text',
                loadComponent: () => import('./components/text-to-text/text-to-text.component').then((c) => c.TextToTextComponent),
            },
            {
                path: 'text-to-speech',
                loadComponent: () => import('./components/text-to-speech/text-to-speech.component').then((c) => c.TextToSpeechComponent),
            },
            {
                path: 'speech-to-speech',
                loadComponent: () => import('./components/speech-to-speech/speech-to-speech.component').then((c) => c.SpeechToSpeechComponent),
            },
            {
                path: 'speech-to-text',
                loadComponent: () => import('./components/speech-to-text/speech-to-text.component').then((c) => c.SpeechToTextComponent),
            }
        ]
    },
    {
        path: 'error',
        loadComponent: () => import('./components/error-page/error-page.component').then((c) => c.ErrorPageComponent)
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'error', pathMatch: 'full'},
];
