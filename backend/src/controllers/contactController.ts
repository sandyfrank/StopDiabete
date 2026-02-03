import { Request, Response } from 'express'
import { ApiError } from '../middleware/errorHandler'
import * as brevo from '@getbrevo/brevo'

interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message }: ContactRequest = req.body

    // Validation
    if (!name || !email || !subject || !message) {
      throw new ApiError(400, 'Tous les champs sont requis')
    }

    // Validation email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new ApiError(400, 'Format d\'email invalide')
    }

    // Configuration du transporteur email
    // En développement, on log juste le message au lieu de l'envoyer
    const isDevelopment = process.env.NODE_ENV === 'development'
    const hasBrevoApiKey = process.env.BREVO_API_KEY && 
                           process.env.BREVO_API_KEY !== 'your_brevo_api_key'
    
    if (isDevelopment && !hasBrevoApiKey) {
      console.log('\n📧 ===== NOUVEAU MESSAGE DE CONTACT =====')
      console.log(`De: ${name} (${email})`)
      console.log(`Sujet: ${subject}`)
      console.log(`Message:\n${message}`)
      console.log('========================================\n')
      
      // Simuler l'envoi réussi
      res.status(200).json({
        success: true,
        message: 'Message envoyé avec succès (mode développement)',
      })
      return
    }

    // Configuration de l'API Brevo
    const apiInstance = new brevo.TransactionalEmailsApi()
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY || ''
    )

    // Préparer l'email avec l'API Brevo
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    
    sendSmtpEmail.to = [{ 
      email: 'sandy.ngaha@aims-cameroon.org',
      name: 'Sandy Frank Kwamou Ngaha'
    }]
    
    sendSmtpEmail.sender = { 
      email: 'frank.ngaha@gmail.com',
      name: 'StopDiabète - Contact'
    }
    
    sendSmtpEmail.replyTo = { 
      email: email,
      name: name
    }
    
    sendSmtpEmail.subject = `[StopDiabète] ${subject}`
    
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau message de contact</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-top: 0; font-size: 18px;">Informations de l'expéditeur</h2>
            <p style="margin: 10px 0;"><strong>Nom :</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #10b981;">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Sujet :</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-top: 0; font-size: 18px;">Message</h2>
            <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 4px;">
            <p style="margin: 0; color: #075985; font-size: 14px;">
              💡 <strong>Répondre :</strong> Vous pouvez répondre directement à cet email pour contacter ${name}.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          <p>Ce message a été envoyé depuis le formulaire de contact de StopDiabète</p>
          <p>Date : ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
        </div>
      </div>
    `
    
    sendSmtpEmail.textContent = `
Nouveau message de contact - StopDiabète

Expéditeur : ${name}
Email : ${email}
Sujet : ${subject}

Message :
${message}

---
Date : ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
    `

    // Envoyer l'email via l'API Brevo
    await apiInstance.sendTransacEmail(sendSmtpEmail)

    res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès',
    })
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    console.error('Erreur lors de l\'envoi du message:', error)
    throw new ApiError(500, 'Erreur lors de l\'envoi du message. Veuillez réessayer.')
  }
}
