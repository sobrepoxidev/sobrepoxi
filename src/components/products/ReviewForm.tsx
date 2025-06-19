'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useLocale } from 'next-intl';

interface ReviewFormProps {
  productId: number;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { supabase } = useSupabase();
    const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setError(locale === 'es' ? 'Debes iniciar sesión para dejar una reseña.' : 'You must be logged in to leave a review.');
        setIsSubmitting(false);
        return;
      }
      
      // Validate comment
      if (!comment.trim()) {
        setError(locale === 'es' ? 'El contenido de la reseña es obligatorio.' : 'The review content is required.');
        setIsSubmitting(false);
        return;
      }
      
      // Check if user has already reviewed this product
      const { data: existingReview } = await supabase
        .from('reviews')
        .select('id')
        .eq('product_id', productId)
        .eq('user_id', session.user.id)
        .single();
      
      if (existingReview) {
        // Update existing review
        const { error: updateError } = await supabase
          .from('reviews')
          .update({
            comment,
            rating,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingReview.id);
          
        if (updateError) throw updateError;
        setSuccessMessage(locale === 'es' ? 'Tu reseña ha sido actualizada.' : 'Your review has been updated.');
      } else {
        // Insert new review
        const { error: insertError } = await supabase
          .from('reviews')
          .insert({
            product_id: productId,
            user_id: session.user.id,
            comment,
            rating
          });
          
        if (insertError) throw insertError;
        setSuccessMessage(locale === 'es' ? 'Tu reseña ha sido publicada.' : 'Your review has been published.');
      }
      
      // Clear form
      setComment('');
      setRating(5);
      
      // Notify parent that a review was submitted
      onReviewSubmitted();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(locale === 'es' ? `Error al enviar la reseña: ${errorMessage}` : `Error submitting review: ${errorMessage}`);
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-6">
      <h3 className="text-lg font-medium mb-4 text-gray-800">{locale === 'es' ? 'Deja tu opinión' : 'Leave your review'}</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {locale === 'es' ? 'Calificación' : 'Rating'}
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                className={`h-8 w-8 cursor-pointer ${
                  star <= (hoveredStar || rating) 
                    ? 'fill-amber-400 text-amber-400' 
                    : 'fill-gray-200 text-gray-200'
                }`} 
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              />
            ))}
          </div>
        </div>
        

        
        {/* Comment */}
        <div className="mb-4">
          <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-1">
            {locale === 'es' ? 'Opinión' : 'Opinion'} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="review-comment"
            className="w-full p-2 border border-gray-300 rounded-md h-24 text-gray-800"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={locale === 'es' ? 'Comparte tu experiencia con este producto...' : 'Share your experience with this product...'}
            required
          />
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (locale === 'es' ? 'Enviando...' : 'Sending...') : (locale === 'es' ? 'Enviar reseña' : 'Submit review')}
        </button>
      </form>
    </div>
  );
}
