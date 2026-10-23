import { NextResponse } from 'next/server';
import { translateHtmlToEnglish, translateToEnglish } from '@/lib/translator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { html, text } = body;

    // Small natural delay so user notices the live translating feedback
    await new Promise((resolve) => setTimeout(resolve, 350));

    const translatedHtml = html ? await translateHtmlToEnglish(html) : '';
    const translatedText = text ? await translateToEnglish(text) : '';

    return NextResponse.json({
      translatedHtml,
      translatedText,
      success: true,
    });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed', success: false },
      { status: 500 }
    );
  }
}
